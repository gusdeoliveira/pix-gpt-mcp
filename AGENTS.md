# Repository Guidelines

## Project Structure & Module Organization
- `server.js`: HTTP + MCP entrypoint registering todo tools and the streamable transport.
- `public/todo-widget.html`: Browser widget that mirrors tool output and simulates local mutations.
- `.env`: Runtime config for Pix endpoints, ScaleKit credentials, and `PORT`; never commit real secrets.
- `node_modules/`: Managed by npm; reinstall via `npm install` instead of editing by hand.

## Build, Test, and Development Commands
- `npm install` - sync dependencies from `package.json` before any run.
- `npm start` - boots the todo MCP server on `http://localhost:8787/mcp` (or `PORT`).
- `npm run emulate` - opens the MCP Inspector against the local server for manual tool trials.
- `node --inspect server.js` - optional breakpoint debugging through Chromium DevTools.

## Coding Style & Naming Conventions
- Stick to ECMAScript modules with 2-space indentation and trailing commas where natural.
- Keep tool ids in snake_case (`add_todo`, `complete_todo`) and DOM ids/data-* attributes in kebab-case.
- Favor pure helpers plus object spreads when mutating todo state, matching the current reducer pattern.
- Run Prettier (`npx prettier --write server.js public/*.html`) before submitting changes.

## Testing Guidelines
- There is no automated suite yet; place new specs under `__tests__/` or `test/` using `node:test` or `vitest`.
- Stub HTTP requests and MCP transports; store fixtures in `test/fixtures/` to avoid network flakiness.
- Exercise widget flows via `npm run emulate` (add, complete, error copy) and capture console output in the PR.
- Block merges when manual regression checks fail or edge cases (empty title, unknown id) break.

## Commit & Pull Request Guidelines
- With no visible Git history, default to Conventional Commits (`feat: add todo completion guard`).
- Reference tracking ids in the footer (`Refs: PIX-123`) and describe any env changes explicitly.
- PRs need a short summary, testing notes, and screenshots/gifs when the widget or UI shifts.
- Request at least one reviewer familiar with MCP SDK patterns; split large refactors into stacked PRs.

## Security & Configuration Tips
- Rotate `.env` tokens often and provide sanitized samples in `.env.example` for new contributors.
- Audit any new tool or endpoint for input validation inside `server.js`, even if the widget pre-validates.
- Avoid logging secrets; prefer IDs or hashes when diagnosing transport issues.
