import {createServer} from "node:http";
import {readFileSync} from "node:fs";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StreamableHTTPServerTransport} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {z} from "zod";

import pkg from 'steplix-emv-qrcps';
const {Merchant}=pkg;
import QRCode from 'qrcode';

const pixHtml=readFileSync("public/pix-widget.html","utf8");
const QR_CODE_SIZE=400;

const addPixInputSchema={
  key: z.string().min(1),
  amount: z.string().min(1).optional(),
  name: z.string().min(1),
  reference: z.string().min(1).optional(),
  key_type: z.string().min(1),
  city: z.string().min(1)
};

const replyWithPix=(message) => ({
  content: message? [{type: "text",text: message}]:[],
  structuredContent: {pixBrCode: pixBrCode,pixQrCode: pixQrCode}
});

const replyWithPixList=(message) => ({
  content: message? [{type: "text",text: message}]:[],
  structuredContent: {pixList: pixList}
});

let pixBrCode="";
let pixQrCode="";
let pixList=[];

const format_text=(text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()
}

const formated_name=(name) => {
  return format_text(name);
}

const formated_city=(city) => {
  return format_text(city);
}

const formated_amount=(amount) => {
  if(amount) {
    return amount.replace('.','').replace(',','.').replace(' ','').replace("R$",'');
  }
  else {
    return ''
  }
}

const formated_reference=(reference) => {
  return this.constructor.format_text(reference).replace(' ','');
}

const formated_key=(key,key_type) => {
  var rkey=key;
  var ktype=key_type.toLowerCase();

  if(ktype=='telefone'||ktype=='cnpj'||ktype=="cpf") {
    rkey=rkey.replace(/\D/g,'');
  }

  if(ktype=="telefone") {
    rkey="+55"+rkey
  }

  return rkey.trim()
}

const generate_qrcp=(args) => {
  var emvqr=Merchant.buildEMVQR();
  console.log(args)

  emvqr.setPayloadFormatIndicator("01");
  emvqr.setCountryCode("BR")
  emvqr.setMerchantCategoryCode("0000");
  emvqr.setTransactionCurrency("986");
  const merchantAccountInformation=Merchant.buildMerchantAccountInformation();
  merchantAccountInformation.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");

  merchantAccountInformation.addPaymentNetworkSpecific("01",formated_key(args.key,args.key_type));

  emvqr.addMerchantAccountInformation("26",merchantAccountInformation);

  emvqr.setMerchantName(formated_name(args.name));
  emvqr.setMerchantCity(formated_city(args.city));

  if(args.amount&&args.amount!='') {
    emvqr.setTransactionAmount(formated_amount(args.amount));
  }

  const additionalDataFieldTemplate=Merchant.buildAdditionalDataFieldTemplate();

  if(args.reference) {
    additionalDataFieldTemplate.setReferenceLabel(formated_reference(args));
  }
  else {
    additionalDataFieldTemplate.setReferenceLabel("***");
  }

  emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);
  return emvqr.generatePayload();
}

function createTodoServer() {
  const server=new McpServer({name: "pix-app",version: "0.1.0"});

  server.registerResource(
    "pix-widget",
    "ui://widget/pix.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/pix.html",
          mimeType: "text/html+skybridge",
          text: pixHtml,
          _meta: {"openai/widgetPrefersBorder": true},
        },
      ],
    })
  );

  server.registerTool(
    "generate_pix",
    {
      title: "Generate Pix",
      description: "Generate a Pix code and QR Code based on the payment information provided.",
      inputSchema: addPixInputSchema,
      _meta: {
        "openai/outputTemplate": "ui://widget/pix.html",
        "openai/toolInvocation/invoking": "Generating Pix",
        "openai/toolInvocation/invoked": "Generated Pix",
      },
    },
    async (args) => {

      const normalizeInput=(value) => value?.trim?.()??"";

      const fields=[
        {name: "key",error: "Missing Pix key."},
        //{name: "amount",error: "Missing Pix amount."},
        {name: "name",error: "Missing Pix recipient name."},
        {name: "key_type",error: "Missing Pix key type."},
        {name: "city",error: "Missing Pix city."}
      ];

      for(const {name,error} of fields) {
        const value=normalizeInput(args?.[name]);
        if(!value) return replyWithPix(error);
      }

      let code=generate_qrcp(args);
      await QRCode.toDataURL(code,{width: QR_CODE_SIZE,height: QR_CODE_SIZE})
        .then(qrcode => {
          pixBrCode=code;
          pixQrCode=qrcode;
          pixList.push({pixBrCode: pixBrCode,pixQrCode: pixQrCode});
        })
        .catch(err => {
          console.error(err)
        });

      return replyWithPix(`Added Pix ${pixBrCode}`);

    }
  );

  server.registerTool(
    "list_pix",
    {
      title: "List Pix",
      description: "List all previous pix payments for this sessions.",
      _meta: {
        "openai/outputTemplate": "ui://widget/pix.html",
        "openai/toolInvocation/invoking": "Getting Pix List",
        "openai/toolInvocation/invoked": "Returned Pix List",
      },
      annotations: {readOnlyHint: true}
    },
    async () => {

      if(pixList.length==0) return replyWithPixList("No Pix created yet. Do you wish to create some?");
      return replyWithPixList(`Completed.`);

    }
  );

  return server;
}

const port=Number(process.env.PORT??8787);
const MCP_PATH="/mcp";

const httpServer=createServer(async (req,res) => {
  if(!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url=new URL(req.url,`http://${req.headers.host??"localhost"}`);

  if(req.method==="OPTIONS"&&url.pathname===MCP_PATH) {
    res.writeHead(204,{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if(req.method==="GET"&&url.pathname==="/") {
    res.writeHead(200,{"content-type": "text/plain"}).end("Todo MCP server");
    return;
  }

  const MCP_METHODS=new Set(["POST","GET","DELETE"]);
  if(url.pathname===MCP_PATH&&req.method&&MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Expose-Headers","Mcp-Session-Id");

    const server=createTodoServer();
    const transport=new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });

    res.on("close",() => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req,res);
    } catch(error) {
      console.error("Error handling MCP request:",error);
      if(!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port,() => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`
  );
});