import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider";
import { Link } from "react-router";

createRoot(document.getElementById('root')!).render(
  <AppsSDKUIProvider linkComponent={Link}>
    <App />
  </AppsSDKUIProvider>,
)
