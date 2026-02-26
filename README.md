# Pix GPT MCP

## Overview
This repository hosts a ChatGPT App that lets the assistant create Brazilian Pix "copia e cola" payments without leaving the thread. A Node.js MCP server exposes Pix-focused tools, streams a Pix widget resource, and serves everything over `http://localhost:8787/mcp` so the ChatGPT runtime can call the connector, render a QR code inline, and guide the user through payment confirmation steps.

<img width="1024" height="504" alt="image" src="https://github.com/user-attachments/assets/095e965f-acf7-4e7e-86b4-625ba5b0bff2" />

## Architecture
- **MCP server (`server.js`)** - Boots `@modelcontextprotocol/sdk` with `StreamableHTTPServerTransport`, registers the `pix-widget` HTML resource, and wires two tools:
  - `generate_pix`: validates user input with `zod`, formats merchant data via `steplix-emv-qrcps`, produces QR images with `qrcode`, caches the Pix payload, and returns both structured JSON (`pixBrCode`, `pixQrCode`) plus textual status messages.
  - `list_pix`: read-only tool that replays the in-memory Pix history for the current server process so users can recall earlier invoices.
- **Widget surface (`public/index.html`)** - Delivered as `text/html+skybridge` so ChatGPT renders Pix cards inline. It binds to the host globals defined in `react/my-app/src/types/openai.d.ts` (`window.openai.callTool`, `requestDisplayMode`, `setWidgetState`, etc.) matching the Apps SDK UI contract.
- **React playground (`react/my-app`)** - Experimental UI toolkit for iterating on widget behavior before copying HTML/CSS back into `public/`. Includes local typings for the ChatGPT host APIs.
- **Docs (`gpt_apps_docs/`)** - Mirrors the official Apps SDK guidance for use-case planning, tool definition, component design, and user interaction heuristics that informed this implementation.
- **Apps SDK UI** - UI components (Badges, Buttons, CopyTooltip, EmptyMessage, LoadingIndicator, etc.) and design tokens from `@openai/apps-sdk-ui` are used in the widget. CSS imports live in `react/my-app/src/App.css` (`@import "@openai/apps-sdk-ui/css"; @source "../node_modules/@openai/apps-sdk-ui";`) and the app is wrapped with `AppsSDKUIProvider` in `react/my-app/src/main.tsx`.

## Development Workflow
- `npm install` - install MCP, QR, and EMV dependencies.
- `npm start` - run the MCP server with `node --watch server.js`, exposing `/mcp` and a health check at `/`.
- `npm run emulate` - launch `@modelcontextprotocol/inspector` pointed at `http://localhost:8787/mcp` to dogfood component rendering and tool invocation.
- Manual smoke tests: `curl http://localhost:8787/` should return `Todo MCP server`; invoking `generate_pix` via the inspector should immediately render the Pix widget with the QR card.

## Extending the App
- Follow the principles in `gpt_apps_docs/APP_DESIGN_GUIDELINES.md` and `DEFINE_TOOLS.md` when adding new Pix flows (split reads/writes, document schemas, add `_meta` hints).
- Keep host-facing UI code aligned with `openai.d.ts` so widgets react to ChatGPT display modes (inline vs fullscreen) and persist state through `setWidgetState`.
- Document any additional environment variables or manual validation steps in `AGENTS.md` and new pull requests so future contributors can reproduce Pix scenarios quickly.
