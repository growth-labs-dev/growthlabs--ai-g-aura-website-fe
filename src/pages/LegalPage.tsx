import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { useLocale } from '../i18n/LocaleContext'

const allowed = ['terms', 'privacy', 'cookies'] as const
type LegalSlug = typeof allowed[number]
type LegalDocument = { title: string; markdown: string; publishedAt?: string; updatedAt?: string; typography?: { fontFamily?: string; fontSize?: number; lineHeight?: number; headingScale?: number } }

function parseLegal(input: unknown): LegalDocument | null {
  if (!input || typeof input !== 'object') return null
  const root = input as Record<string, unknown>
  const candidate = root.document && typeof root.document === 'object' ? root.document as Record<string, unknown> : root
  if (typeof candidate.title !== 'string' || typeof candidate.markdown !== 'string') return null
  return { title: candidate.title, markdown: candidate.markdown, publishedAt: typeof candidate.publishedAt === 'string' ? candidate.publishedAt : undefined, updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : undefined, typography: typeof candidate.typography === 'object' ? candidate.typography as LegalDocument['typography'] : undefined }
}

export default function LegalPage() {
  const { slug } = useParams()
  const { locale } = useLocale()
  const [document, setDocument] = useState<LegalDocument | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'unpublished' | 'error'>('loading')
  const legalSlug = allowed.includes(slug as LegalSlug) ? slug as LegalSlug : null
  useEffect(() => {
    if (!legalSlug) return
    const controller = new AbortController()
    setState('loading')
    fetch(`/growth-api/v1/legal/${legalSlug}/${locale}`, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (response.status === 404) { setState('unpublished'); return }
        if (!response.ok) throw new Error('legal_document_unavailable')
        const parsed = parseLegal(await response.json())
        if (!parsed) throw new Error('invalid_legal_document')
        setDocument(parsed); setState('ready')
      })
      .catch((error: Error) => { if (error.name !== 'AbortError') setState('error') })
    return () => controller.abort()
  }, [legalSlug, locale])
  useEffect(() => { if (document) document.title = `${document.title} — Growth AI` }, [document])
  if (!legalSlug) return <Navigate to="/" replace />
  const labels = locale === 'en' ? { loading: 'Loading document…', unpublished: 'This document has not been published yet.', error: 'The document is temporarily unavailable.', retry: 'Try again', updated: 'Last updated' } : { loading: 'A carregar documento…', unpublished: 'Este documento ainda não foi publicado.', error: 'O documento está temporariamente indisponível.', retry: 'Tentar novamente', updated: 'Última atualização' }
  return <div className="legal-page"><SiteHeader /><main className="legal-main shell">{state === 'loading' && <div className="legal-state" role="status">{labels.loading}</div>}{state === 'unpublished' && <div className="legal-state"><h1>{labels.unpublished}</h1></div>}{state === 'error' && <div className="legal-state"><h1>{labels.error}</h1><button className="button button--ink" type="button" onClick={() => window.location.reload()}>{labels.retry}</button></div>}{state === 'ready' && document && <article className="legal-document"><header><p>Growth AI · {locale.toUpperCase()}</p><h1>{document.title}</h1>{(document.updatedAt || document.publishedAt) && <time>{labels.updated}: {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(document.updatedAt || document.publishedAt!))}</time>}</header><div className="legal-markdown"><Markdown remarkPlugins={[remarkGfm]} skipHtml>{document.markdown}</Markdown></div></article>}</main><SiteFooter /></div>
}
