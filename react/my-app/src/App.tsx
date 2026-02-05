import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { EmptyMessage } from "@openai/apps-sdk-ui/components/EmptyMessage";
import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";
import { CopyTooltip } from "@openai/apps-sdk-ui/components/Tooltip";
import { ClipboardCopy, Calendar } from "@openai/apps-sdk-ui/components/Icon";
import { Select, type Option } from "@openai/apps-sdk-ui/components/Select";

type PixToolOutput = {
  pixBrCode?: string;
  pixQrCode?: string;
};

const REMINDER_OPTIONS: Option[] = [
  { value: "in 1 hour", label: "Em 1 hora" },
  { value: "in 2 hours", label: "Em 2 horas" },
  { value: "tomorrow", label: "Amanhã" },
  { value: "in 1 week", label: "Em 1 semana" },
  { value: "end of month", label: "No fim do mês" },
];

type Status =
  | { type: "idle"; message?: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type SafeInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const SET_GLOBALS_EVENT = "openai:set_globals";

const getHost = () => (typeof window !== "undefined" ? window.openai : undefined);

function App() {
  const host = getHost();
  const [pixOutput, setPixOutput] = useState<PixToolOutput>(() => {
    if (host) {
      return (host.toolOutput as PixToolOutput) ?? {};
    }
    return null;
  });

  const [status, setStatus] = useState<Status>(
    pixOutput.pixBrCode
      ? { type: "success", message: "Pix pronto para copiar." }
      : { type: "idle", message: "Nenhum Pix gerado ainda." },
  );
  const [reminderChoice, setReminderChoice] = useState<string>(REMINDER_OPTIONS[0].value);
  const [theme, setTheme] = useState<string>(() => host?.theme ?? "light");
  const [safeArea, setSafeArea] = useState<SafeInsets>(
    () => host?.safeArea?.insets ?? { top: 0, bottom: 0, left: 0, right: 0 },
  );

  const previewRecord = useMemo(() => {
    if (pixOutput?.pixBrCode) {
      return {
        pixBrCode: pixOutput.pixBrCode,
        pixQrCode: pixOutput.pixQrCode ?? "",
      };
    }
    return undefined;
  }, [pixOutput]);

  const handleCreateReminder = async () => {
    if (!previewRecord?.pixBrCode) return;
    if (!host || !host.sendFollowUpMessage) {
      setStatus({
        type: "error",
        message: "Lembretes só estão disponíveis dentro do ChatGPT.",
      });
      return;
    }

    const reference = "referência não informada";
    const name = "pagamento Pix";
    const prompt = `Crie um lembrete para pagar este Pix ${reminderChoice}. Nome: ${name}. Referência: ${reference}. Código copia e cola: ${previewRecord.pixBrCode}. Pergunte ao usuário se deseja ajustar o horário ou adicionar detalhes.`;

    try {
      await host.sendFollowUpMessage({prompt});
      setStatus({type: "success", message: "Lembrete solicitado ao ChatGPT."});
    } catch (error) {
      console.error(error);
      setStatus({type: "error", message: "Não foi possível solicitar o lembrete."});
    }
  };

  useEffect(() => {
    const handleSetGlobals = (event: Event) => {
      const detail = (event as CustomEvent<{ globals?: Record<string, unknown> }>).detail
        ?.globals;
      if (!detail) return;

      if (typeof detail.theme === "string") {
        setTheme(detail.theme);
      }

      if (detail.safeArea && typeof detail.safeArea === "object") {
        const insets = (detail.safeArea as { insets?: SafeInsets }).insets;
        if (insets) setSafeArea(insets);
      }

      if (detail.toolOutput) {
        setPixOutput(detail.toolOutput as PixToolOutput);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener(SET_GLOBALS_EVENT, handleSetGlobals);
      return () => window.removeEventListener(SET_GLOBALS_EVENT, handleSetGlobals);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!pixOutput) return;
    if (pixOutput.pixBrCode) {
      setStatus({ type: "success", message: "Pix pronto para uso." });
    }
  }, [pixOutput]);

  return (
    <div
      className={`pix-shell theme-${theme}`}
      style={{
        paddingTop: safeArea.top,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
    >
      <main className="pix-card">
        <header className="pix-header">
          <div>
            <p className="pix-eyebrow">Pagamentos Pix</p>
            <h1>Gerar pagamento Pix</h1>
            <p className="pix-subtitle">Peça o Pix e mostraremos aqui o QR e o código copia e cola para pagar.</p>
          </div>
        </header>

        <section className="pix-body">
          <div className="pix-preview">
            <div className="status-row">
              <Badge
                color={
                  status.type === "error"
                    ? "danger"
                    : status.type === "success"
                    ? "success"
                    : status.type === "loading"
                    ? "info"
                    : "secondary"
                }
                variant={status.type === "loading" ? "soft" : "solid"}
              >
                {status.message}
              </Badge>
              {status.type === "loading" && <LoadingIndicator size="sm" />}
            </div>
            {previewRecord?.pixBrCode ? (
              <>
                <img
                  src={previewRecord.pixQrCode}
                  alt="QR Code do pagamento Pix"
                  className="pix-qr"
                />
                <p className="pix-code-label">Código "copia e cola"</p>
                <CopyTooltip copyValue={previewRecord.pixBrCode} side="top" align="center">
                  <p className="pix-code copy-hint" role="button" tabIndex={0}>
                    {previewRecord.pixBrCode}
                    <span className="copy-icon">
                      <ClipboardCopy />
                    </span>
                  </p>
                </CopyTooltip>
                <div className="reminder-row">
                  <Select
                    value={reminderChoice}
                    onChange={(option) => setReminderChoice(option.value)}
                    options={REMINDER_OPTIONS}
                    placeholder="Selecione um horário"
                    size="sm"
                    variant="soft"
                    TriggerStartIcon={Calendar}
                  />
                  <Button variant="soft" color="primary" size="sm" onClick={handleCreateReminder}>
                    Criar lembrete
                  </Button>
                </div>
              </>
            ) : (
              <EmptyMessage fill="static">
                <EmptyMessage.Icon color="secondary">
                  <LoadingIndicator size="lg" />
                </EmptyMessage.Icon>
                <EmptyMessage.Title>Gerando Pix…</EmptyMessage.Title>
                <EmptyMessage.Description>
                  Aguarde enquanto o código copia e cola e o QR são preparados.
                </EmptyMessage.Description>
                <EmptyMessage.ActionRow>
                  <Button variant="soft" color="secondary" disabled>
                    Em andamento
                  </Button>
                </EmptyMessage.ActionRow>
              </EmptyMessage>
            )}
          </div>
        </section>

        <footer className="pix-footer">
          <p>
            O app não intermedia pagamentos nem armazena dados bancários. Verifique o código antes
            de pagar no seu banco de preferência.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
