import {createServer} from "node:http";
import {readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StreamableHTTPServerTransport} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {z} from "zod";

import pkg from "steplix-emv-qrcps";
const {Merchant}=pkg;
import QRCode from "qrcode";

const ROOT_DIR=path.dirname(fileURLToPath(import.meta.url));

const readUtf8FromPublic=(filePath) => readFileSync(path.resolve(ROOT_DIR,"public",filePath),"utf8");
const readBinaryFromPublic=(filePath) => readFileSync(path.resolve(ROOT_DIR,"public",filePath));

const pixHtml=readUtf8FromPublic("index.html");
const docsHtml=readUtf8FromPublic("docs.html");
const privacyHtml=readUtf8FromPublic("privacy.html");
const termsHtml=readUtf8FromPublic("terms.html");
const faviconIco=readBinaryFromPublic("favicon.ico");
const logoSvg=readUtf8FromPublic("logo.svg");
const PIX_WIDGET_URI="ui://widget/pix.v1.html";
const QR_CODE_SIZE=300;
const AMOUNT_REGEX=/^\d+(\.\d{2})?$/;
const UUID_REGEX=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_REGEX=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const addPixInputSchema={
  key: z.string().min(1).describe("Chave para o pagamento Pix."),
  amount: z
    .string()
    .regex(AMOUNT_REGEX,"Use ponto para decimais, ex: 40.00.")
    .optional()
    .describe(
      "Valor do pagamento Pix usando ponto como decimal (ex: 40.00). Deixe vazio para pagamentos sem valor definido.",
    ),
  name: z.string().min(1).describe("Nome do recebedor do pagamento Pix."),
  reference: z.string().optional().describe("Referência do pagamento Pix. Opcional."),
  key_type: z.string().optional().describe("Tipo da chave Pix (email, telefone, cpf, cnpj, aleatoria). Se omitido, inferir automaticamente a partir da chave."),
  city: z.string().min(1).describe("Cidade do recebedor do pagamento Pix."),
};

const replyWithPix=(message,payload={pixBrCode: "",pixQrCode: ""}) => ({
  content: message? [{type: "text",text: message}]:[],
  structuredContent: payload,
});

let pixBrCode="";
let pixQrCode="";

const format_text=(text) => {
  return text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
};

const formated_name=(name) => {
  return format_text(name);
};

const formated_city=(city) => {
  return format_text(city);
};

const formated_amount=(amount) => {
  if(!amount) return "";
  const normalized=amount.replace(/\s|R\$/g,"").trim();
  if(!AMOUNT_REGEX.test(normalized)) {
    throw new Error("Invalid Pix amount. Use 40.00.");
  }
  return normalized;
};

const formated_reference=(reference) => {
  return format_text(reference).replace(" ","");
};

const infer_key_type=(key) => {
  const normalized=key.trim();
  const digits=normalized.replace(/\D/g,"");

  if(EMAIL_REGEX.test(normalized)) return "email";
  if(UUID_REGEX.test(normalized)) return "aleatoria";
  if(digits.length===14) return "cnpj";
  if(digits.length===11) {
    if(/[()+-\s]/.test(normalized)||normalized.startsWith("+55")) return "telefone";
    return "cpf";
  }
  if(digits.length>=10&&digits.length<=13) return "telefone";

  return "aleatoria";
};

const formated_key=(key,key_type) => {
  let rkey=key;
  const ktype=(key_type??infer_key_type(key)).toLowerCase();

  if(ktype==="telefone"||ktype==="cnpj"||ktype==="cpf") {
    rkey=rkey.replace(/\D/g,"");
  }

  if(ktype==="telefone") {
    rkey="+55"+rkey;
  }

  return rkey.trim();
};

const generate_qrcp=(args) => {
  const emvqr=Merchant.buildEMVQR();
  console.log(args);

  emvqr.setPayloadFormatIndicator("01");
  emvqr.setCountryCode("BR");
  emvqr.setMerchantCategoryCode("0000");
  emvqr.setTransactionCurrency("986");
  const merchantAccountInformation=Merchant.buildMerchantAccountInformation();
  merchantAccountInformation.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");

  merchantAccountInformation.addPaymentNetworkSpecific("01",formated_key(args.key,args.key_type));

  emvqr.addMerchantAccountInformation("26",merchantAccountInformation);

  emvqr.setMerchantName(formated_name(args.name));
  emvqr.setMerchantCity(formated_city(args.city));

  if(args.amount&&args.amount!=="") {
    emvqr.setTransactionAmount(formated_amount(args.amount));
  }

  const additionalDataFieldTemplate=Merchant.buildAdditionalDataFieldTemplate();

  if(args.reference) {
    additionalDataFieldTemplate.setReferenceLabel(formated_reference(args.reference));
  } else {
    additionalDataFieldTemplate.setReferenceLabel("***");
  }

  emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);
  return emvqr.generatePayload();
};

function createTodoServer() {
  const server=new McpServer({name: "pix-app",version: "0.1.0"});

  server.registerResource(
    "pix-widget",
    PIX_WIDGET_URI,
    {},
    async () => ({
      contents: [
        {
          uri: PIX_WIDGET_URI,
          mimeType: "text/html;profile=mcp-app",
          text: pixHtml,
          _meta: {
            ui: {
              prefersBorder: true,
              domain: "https://pix.mcp.11feed.com",
              csp: {
                connectDomains: ["https://pix.mcp.11feed.com"],
                resourceDomains: ["https://pix.mcp.11feed.com"],
              },
            },
            "openai/widgetPrefersBorder": true,
            "openai/max": true,
            "openai/widgetDescription": "Widget para exibir códigos Pix (cópia e cola e QR Code) gerados.",
            "openai/widgetDomain": "https://pix.mcp.11feed.com",
            "openai/widgetCSP": {
              connect_domains: ["https://pix.mcp.11feed.com"],
              resource_domains: ["https://pix.mcp.11feed.com"],
            }
          },
        },
      ],
    }),
  );

  server.registerTool(
    "generate_code",
    {
      title: "Gerar Códigos para Pagamento Pix",
      description: "Use isto quando o usuário pedir algo como: \"Gere um pix para...\", \"Gere um pagamento pix...\", \"Faça um pix para/de...\" ou \"Gere um código pix...\". Gere código Pix (copia e cola e QR Code) com base nas informações fornecidas, sempre ofereça ao usuário a opção de copiar o código e baixar o QR Code, e nunca assuma valores: solicite explicitamente chave, nome, cidade e quaisquer campos faltantes antes de gerar. Se o usuário não indicar o tipo de chave, infira-o a partir do valor e envie o campo key_type correspondente.",
      inputSchema: addPixInputSchema,
      _meta: {
        ui: {
          resourceUri: PIX_WIDGET_URI,
        },
        "openai/outputTemplate": PIX_WIDGET_URI,
        "openai/toolInvocation/invoking": "Gerando Códigos de Pagamento Pix",
        "openai/toolInvocation/invoked": "Códigos Pagamento Pix Gerado",
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        destructiveHint: false
      },
    },
    async (args) => {
      try {
        const normalizeInput=(value) => value?.trim?.()??"";

        const fields=[
          {name: "key",error: "Missing Pix key."},
          //{name: "amount",error: "Missing Pix amount."},
          {name: "name",error: "Missing Pix recipient name."},
          {name: "city",error: "Missing Pix city."},
        ];

        for(const {name,error} of fields) {
          const value=normalizeInput(args?.[name]);
          if(!value) return replyWithPix(error);
        }

        const resolvedKeyType=normalizeInput(args?.key_type)||infer_key_type(args.key);
        const normalizedArgs={...args,key_type: resolvedKeyType};
        const code=generate_qrcp(normalizedArgs);
        const qrcode=await QRCode.toDataURL(code,{width: QR_CODE_SIZE,height: QR_CODE_SIZE});

        pixBrCode=code;
        pixQrCode=qrcode;

        return replyWithPix(`Added Pix ${pixBrCode}.`,{pixBrCode,pixQrCode});
      } catch(err) {
        console.error(err);
        if(err instanceof Error && err.message.startsWith("Invalid Pix amount")) {
          return replyWithPix(err.message);
        }
        return replyWithPix(`An error occurred while generating the payment, please try again later.`);
      }
    },
  );

  /*server.registerTool(
    "list_pix",
    {
      title: "Listar Pagamentos Pix Anteriores",
      description: "Lista todos os pagamentos pix anteriores para esta sessão.",
      _meta: {
        "openai/outputTemplate": PIX_WIDGET_URI,
        "openai/toolInvocation/invoking": "Consultando Pagamentos Recentes",
        "openai/toolInvocation/invoked": "Pagamentos Recentes Retornados",
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
        destructiveHint: false
      },
    },
    async () => {
      try {
        if(pixList.length===0) return replyWithPixList("No Pix created yet. Do you wish to create some?");
        return replyWithPixList(`Completed.`);
      } catch(err) {
        console.error(err);
        return replyWithPix(`An error occurred while generating the payment, please try again later.`);
      }
    },
  );*/

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
    res.writeHead(200,{"content-type": "text/html; charset=utf-8"}).end(docsHtml);
    return;
  }

  if(req.method==="GET"&&url.pathname==="/favicon.ico") {
    res.writeHead(200,{
      "content-type": "image/x-icon",
      "cache-control": "public, max-age=86400",
    }).end(faviconIco);
    return;
  }

  if(req.method==="GET"&&url.pathname==="/logo.svg") {
    res.writeHead(200,{
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400",
    }).end(logoSvg);
    return;
  }

  if(req.method==="GET"&&url.pathname==="/privacy") {
    res.writeHead(200,{"content-type": "text/html; charset=utf-8"}).end(privacyHtml);
    return;
  }

  if(req.method==="GET"&&url.pathname==="/terms") {
    res.writeHead(200,{"content-type": "text/html; charset=utf-8"}).end(termsHtml);
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
  console.log(`11 on http://localhost:${port}${MCP_PATH}`);
});
