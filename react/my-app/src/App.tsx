import './App.css'
import { NavLink } from 'react-router';

function App() {
  const pixBrCode = "00020126450014BR.GOV.BCB.PIX0123gustavolive22@gmail.com52040000530398654031005802BR5918GUSTAVO DE O S SIL6009Sao Paulo62070503***6304045B";
  const pixQrCode = "data:image/png;base64,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";

  const alertUser = (message: string) => {
    if (typeof window !== 'undefined') {
      window.alert(message);
    }
  };

  const copyPixCode = async () => {
    if (typeof navigator === 'undefined') {
      alertUser('Copiar o Pix só funciona no navegador.');
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pixBrCode);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = pixBrCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } else {
        throw new Error('Método de cópia indisponível.');
      }

      alertUser('Código Pix copiado para a área de transferência.');
    } catch (error) {
      console.error('Erro ao copiar o Pix.', error);
      alertUser('Não foi possível copiar o Pix. Tente novamente.');
    }
  };

  const sharePixCode = async () => {
    if (typeof navigator === 'undefined') {
      alertUser('Compartilhar o Pix só funciona no navegador.');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pagamento Pix',
          text: pixBrCode,
        });
        return;
      } catch (error) {
        if ((error as DOMException)?.name === 'AbortError') {
          return;
        }

        console.error('Erro ao compartilhar o Pix.', error);
        alertUser('Não foi possível compartilhar o Pix. Tente novamente.');
        return;
      }
    }

    await copyPixCode();
    alertUser('Compartilhamento não suportado. Copiamos o código Pix para você.');
  };

  return (
    <>
      <h1>Gerar Pagamento Pix</h1>
      <p className="read-the-docs">
        Seu código pix:{pixBrCode}
      </p>
      <img src={pixQrCode}/>
      <button onClick={copyPixCode}>
        Copy
      </button>
      <button onClick={sharePixCode}>
        Open In Bank
      </button>
      <NavLink to="/pix-list">All Payments</NavLink>
    </>
  )
}

export default App
