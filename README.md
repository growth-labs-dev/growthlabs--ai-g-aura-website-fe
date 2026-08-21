# Growth AI website

Official Growth AI product website for `g-aura.growthlabs.pt`. Built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Local development

```bash
npm ci
npm run dev
```

Vite proxies `/growth-api` to `http://127.0.0.1:8080`. The production Nginx container proxies the same path to `growth-api:8080` on the private Docker network.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run test:e2e
docker build -t growth-ai-website:local .
```

## Public API contracts

- Legal: `GET /growth-api/v1/legal/{terms|privacy|cookies}/{en|pt}`. Only published documents are shown; a `404` renders a clear unpublished state.
- Status: `GET /growth-api/v1/status`. The page consumes `generatedAt`, `overall`, `periodDays`, `services[]` (`status`, `latencyMs`, `detail`, `checkedAt`, `uptimePercent`) and optional `incidents[]` (`serviceId`, `summary`, `resolution`). Missing metrics are shown as not reported. If a later poll fails, the in-memory snapshot for that open page is labelled as last known; status is never persisted in browser storage.

No API keys, OAuth secrets, billing checkout or synthetic service metrics are embedded in this frontend. Sign-up CTAs lead to `https://g-chat.growthlabs.pt/register`; activation and the stated one-time payment are confirmed after account approval.

## Deployment preparation

`compose.yaml` prepares the Host rule for `g-aura.growthlabs.pt` with lower priority than the API path router. It expects the existing external `web` network, where Nginx can resolve the `growth-api` service. The container is non-root, read-only, capability-free and resource-limited. This repository does not deploy or alter production infrastructure by itself.
