# Repository Guidelines

## Project Structure & Module Organization
- `server.js` hosts the MCP HTTP server, tool definitions, and Pix QR-code generation logic; keep reusable helpers co-located here or split into new modules under `lib/` when they grow.
- `public/index.html` provides the Pix widget that inspectors embed; adjust UI assets here and keep it free of build artifacts.
- `react/my-app` is a standalone React playground for future UI work; sync production-ready components back into `public/` before shipping.
- `gpt_apps_docs/` stores reference material from the GPT Apps SDK and should remain untouched unless documentation needs updating.
- Configuration lives in `.env` (only `PORT` today); add new secrets there and document them before merging.

## Build, Test, and Development Commands
- `npm install` installs the MCP server, QR code, and EMV dependencies; run after pulling new changes.
- `npm start` launches `server.js` with `node --watch`, rebuilding the Pix resources at `http://localhost:8787/mcp`.
- `npm run emulate` opens `@modelcontextprotocol/inspector` against the local server; use this to validate widgets/tools before submitting changes.
- Manual smoke test: `curl http://localhost:8787/` should return "Todo MCP server"; failures usually mean the watcher is still compiling.

## Coding Style & Naming Conventions
- ES modules are enabled via `"type": "module"`; prefer `import`/`export`, `const` by default, and arrow functions for callbacks.
- Follow the existing two-space indentation, double quotes for strings, and `camelCase` for functions/variables; reserve `SCREAMING_SNAKE_CASE` for constants like `QR_CODE_SIZE`.
- Keep Pix schema definitions together and reuse `zod` descriptions so the inspector surfaces consistent copy.

## Testing Guidelines
- No automated suite exists yet and `npm test` intentionally exits with code 1; add a real test runner (Vitest/Jest) when contributing significant logic.
- Co-locate tests next to the modules they cover (e.g., `server.test.js` or `react/my-app/src/__tests__/pixWidget.test.tsx`) so utilities stay discoverable.
- Include manual validation notes in PRs (inspector screenshots or curl transcripts) until automated coverage lands.

## Commit & Pull Request Guidelines
- Follow the Conventional Commits style observed in history (`feat:`, `chore:`, etc.), keeping subject lines under ~70 characters and describing the user-facing change.
- Each PR should describe the change, reference related issues, and attach widget screenshots or inspector logs when UI or protocol behavior changes.
- Note any new environment variables, migration steps, or manual setup tasks in the PR description so other agents can reproduce your results quickly.

## Security & Configuration Tips
- Never commit `.env` or Pix payloads containing real customer data; scrub keys before sharing logs.
- Reset in-memory data (`pixList`, `pixQrCode`) when testing multi-user scenarios to avoid leaking previous sessions.
- Validate inputs through `zod` schemas and keep formatting helpers (`formated_*`) side-effect free to prevent tampering with generated EMV payloads.

## UI Widget Guidelines
- Default widget containers to `height: auto` (avoid `min-height: 100vh`) unless a full-viewport experience is explicitly required.
- When the user asks to "remember" a practice, capture it here in `AGENTS.md` so future contributors see the instruction.
- Let ChatGPT provide outer container framing; avoid adding extra borders/radius/shadow around the top-level widget surface, especially in dark mode where double borders can clash.
- Encoding safety: avoid PowerShell `Get-Content`/`Set-Content`, `-replace`, or ad-hoc byte conversion for edits because they default to CP1252 and corrupt UTF-8; use `apply_patch` or Python with explicit UTF-8 read/write.
- Tool copy/download prompts: ensure the Pix generation tool description asks ChatGPT to offer copy-code and QR-download options and to request all required inputs instead of assuming defaults.
- Keep accents in PT-BR strings; no ASCII downgrades unless explicitly requested.
- After replacing the widget bundle (`public/index.html`), restart the MCP server to pick up the new UI.
- Always restart the MCP server after successful bundle updates (e.g., copying `react/my-app/dist/index.html` to `public/index.html`).
