import { useEffect, useMemo, useRef, useState } from 'react'
import { DocsLayout } from '../components/DocsLayout'
import { useLocale } from '../i18n/LocaleContext'

type Condition = 'operational' | 'degraded' | 'outage' | 'unknown'
type Service = { id: string; name: string; status: Condition; latencyMs?: number | null; checkedAt?: string | null; message?: string | null; uptime?: number | null; history?: Array<{ at: string; status: Condition }> }
type Incident = { id: string; serviceId?: string; summary: string; status?: string; startedAt?: string; resolvedAt?: string | null; resolution?: string | null }
type StatusSnapshot = { status: Condition; checkedAt?: string; periodDays?: number; services: Service[]; incidents?: Incident[] }

const ids = ['api', 'chat', 'auth', 'models', 'local-compute', 'remote-inference']
const names = { en: { api: 'Growth API', chat: 'Growth Chat', auth: 'Authentication', models: 'Model gateway', 'local-compute': 'Local server', 'remote-inference': 'Remote inference' }, pt: { api: 'Growth API', chat: 'Growth Chat', auth: 'Autenticação', models: 'Gateway de modelos', 'local-compute': 'Servidor local', 'remote-inference': 'Inferência remota' } }

function validCondition(value: unknown): Condition { return value === 'operational' || value === 'degraded' || value === 'outage' ? value : 'unknown' }
function parseStatus(input: unknown): StatusSnapshot | null {
  if (!input || typeof input !== 'object') return null
  const root = input as Record<string, unknown>
  const data = root.data && typeof root.data === 'object' ? root.data as Record<string, unknown> : root
  if (!Array.isArray(data.services)) return null
  return {
    status: validCondition(data.overall),
    checkedAt: typeof data.generatedAt === 'string' ? data.generatedAt : undefined,
    periodDays: typeof data.periodDays === 'number' ? data.periodDays : undefined,
    services: data.services.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object').map((item) => ({ id: String(item.id || ''), name: String(item.name || item.id || ''), status: validCondition(item.status), latencyMs: typeof item.latencyMs === 'number' ? item.latencyMs : null, checkedAt: typeof item.checkedAt === 'string' ? item.checkedAt : null, message: typeof item.detail === 'string' ? item.detail : null, uptime: typeof item.uptimePercent === 'number' ? item.uptimePercent : null, history: Array.isArray(item.history) ? item.history as Service['history'] : undefined })),
    incidents: Array.isArray(data.incidents) ? data.incidents.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object').map((item) => ({ id: String(item.id || ''), serviceId: typeof item.serviceId === 'string' ? item.serviceId : undefined, summary: typeof item.summary === 'string' ? item.summary : '', status: typeof item.status === 'string' ? item.status : undefined, startedAt: typeof item.startedAt === 'string' ? item.startedAt : undefined, resolvedAt: typeof item.resolvedAt === 'string' ? item.resolvedAt : null, resolution: typeof item.resolution === 'string' ? item.resolution : null })) : [],
  }
}

export default function StatusPage() {
  const { locale } = useLocale()
  const [snapshot, setSnapshot] = useState<StatusSnapshot | null>(null)
  const snapshotRef = useRef<StatusSnapshot | null>(null)
  const [source, setSource] = useState<'live' | 'last-known' | 'unavailable'>('unavailable')
  const [loading, setLoading] = useState(true)
  const text = locale === 'en' ? { title: 'Growth AI system status', body: 'Live availability for the services behind Growth AI.', live: 'Live', old: 'Last known state — live status is unavailable', unavailable: 'Status data is unavailable', checked: 'Checked', latency: 'Latency', uptime: 'Uptime', unknown: 'Not reported', incidents: 'Incidents', none: 'No incidents reported by the status API.', operational: 'Operational', degraded: 'Degraded', outage: 'Outage' } : { title: 'Estado do sistema Growth AI', body: 'Disponibilidade em tempo real dos serviços da Growth AI.', live: 'Em direto', old: 'Último estado conhecido — o estado em direto está indisponível', unavailable: 'Dados de estado indisponíveis', checked: 'Verificado', latency: 'Latência', uptime: 'Disponibilidade', unknown: 'Não reportado', incidents: 'Incidentes', none: 'A API de estado não reporta incidentes.', operational: 'Operacional', degraded: 'Degradado', outage: 'Interrupção' }
  useEffect(() => {
    const controller = new AbortController()
    const refresh = () => fetch('/growth-api/v1/status', { signal: controller.signal, headers: { Accept: 'application/json' } }).then(async (response) => { if (!response.ok) throw new Error('status_unavailable'); const parsed = parseStatus(await response.json()); if (!parsed) throw new Error('status_invalid'); snapshotRef.current = parsed; setSnapshot(parsed); setSource('live') }).catch((error: Error) => { if (error.name !== 'AbortError') setSource(snapshotRef.current ? 'last-known' : 'unavailable') }).finally(() => setLoading(false))
    void refresh()
    const timer = window.setInterval(() => void refresh(), 30_000)
    return () => { controller.abort(); window.clearInterval(timer) }
  }, [])
  const services = useMemo(() => ids.map((id) => snapshot?.services.find((service) => service.id === id) || { id, name: names[locale][id as keyof typeof names.en], status: 'unknown' as Condition }), [snapshot, locale])
  return <DocsLayout><main className="status-content"><header><p>Growth AI</p><h1>{text.title}</h1><span>{text.body}</span><div className={`status-source status-source--${source}`}>{loading ? '…' : source === 'live' ? text.live : source === 'last-known' ? text.old : text.unavailable}</div>{snapshot?.checkedAt && <time>{text.checked}: {new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(snapshot.checkedAt))}</time>}</header><section className="service-grid" aria-label="Services">{services.map((service) => <article key={service.id}><div><span className={`status-dot status-dot--${service.status}`} /><h2>{service.name || names[locale][service.id as keyof typeof names.en] || service.id}</h2><strong>{service.status === 'unknown' ? text.unknown : text[service.status]}</strong></div>{service.message && <p>{service.message}</p>}<dl><div><dt>{text.latency}</dt><dd>{typeof service.latencyMs === 'number' ? `${Math.round(service.latencyMs)} ms` : text.unknown}</dd></div><div><dt>{text.uptime}</dt><dd>{typeof service.uptime === 'number' ? `${service.uptime.toFixed(2)}%` : text.unknown}</dd></div></dl></article>)}</section><section className="incidents"><h2>{text.incidents}</h2>{snapshot?.incidents?.length ? snapshot.incidents.map((incident) => <article key={incident.id}><h3>{incident.summary}</h3>{incident.resolution && <p>{incident.resolution}</p>}<span>{[incident.serviceId, incident.status].filter(Boolean).join(' · ')}</span></article>) : <p>{text.none}</p>}</section></main></DocsLayout>
}
