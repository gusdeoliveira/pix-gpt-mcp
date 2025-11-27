import { useEffect, useMemo, useState } from "react";
import "./App.css";

type PixToolOutput = {
  pixBrCode?: string;
  pixQrCode?: string;
};

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

const FALLBACK_OUTPUT: PixToolOutput = {
  pixBrCode:
    "00020126450014BR.GOV.BCB.PIX0123gustavolive22@gmail.com52040000530398654031005802BR5918GUSTAVO DE O S SIL6009Sao Paulo62070503***6304045B",
  pixQrCode:
    "data:image/png;base64,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",
};

const SET_GLOBALS_EVENT = "openai:set_globals";

const getHost = () => (typeof window !== "undefined" ? window.openai : undefined);

function App() {
  const host = getHost();
  const [pixOutput, setPixOutput] = useState<PixToolOutput>(() => {
    if (host) {
      return (host.toolOutput as PixToolOutput) ?? {};
    }
    return FALLBACK_OUTPUT;
  });

  const [status, setStatus] = useState<Status>(
    pixOutput.pixBrCode
      ? { type: "success", message: "Pix pronto para copiar." }
      : { type: "idle", message: "Nenhum Pix gerado ainda." },
  );
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
            <p className="pix-eyebrow">Inline - Pagamentos Pix</p>
            <h1>Gerar pagamento Pix</h1>
            <p className="pix-subtitle">
              Gere um Pix pelo prompt. Quando o modelo chamar o tool, o QR e o copia-e-cola aparecem aqui.
            </p>
          </div>
        </header>

        <section className="pix-body">
          <div className="pix-preview">
            <div className={`pix-status status-${status.type}`}>
              <span>{status.message}</span>
            </div>
            {previewRecord?.pixBrCode ? (
              <>
                <img
                  src={previewRecord.pixQrCode}
                  alt="QR Code do pagamento Pix"
                  className="pix-qr"
                />
                <p className="pix-code-label">Código "copia e cola"</p>
                <p className="pix-code">{previewRecord.pixBrCode}</p>
              </>
            ) : (
              <div className="pix-empty shimmer">
                <div className="shimmer-block" />
                <div className="shimmer-block short" />
              </div>
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
