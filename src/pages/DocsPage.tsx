import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DocsLayout } from '../components/DocsLayout'
import { CopyIcon } from '../components/ui/Icons'
import { docsByLocale } from '../content/docs'
import { useLocale } from '../i18n/LocaleContext'
import { localisedPath } from '../i18n/links'

export default function DocsPage() {
  const { slug = 'overview' } = useParams()
  const { locale } = useLocale()
  const docs = docsByLocale[locale]
  const doc = docs.find((item) => item.slug === slug)
  useEffect(() => { if (doc) { document.title = `${doc.title} — Growth AI Docs`; window.scrollTo(0, 0) } }, [doc])
  if (!doc) return <Navigate to="/docs/overview" replace />
  const index = docs.findIndex((item) => item.slug === doc.slug)
  const copyCode = (code: string) => void navigator.clipboard?.writeText(code)
  return (
    <DocsLayout>
      <article className="docs-content">
        <header><p>{doc.group}</p><h1>{doc.title}</h1><span>{doc.description}</span></header>
        {doc.blocks.map((block) => <section key={block.heading} id={block.heading.toLowerCase().replaceAll(' ', '-')}><h2>{block.heading}</h2>{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.bullets && <ul>{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}{block.code && <div className="code-block"><button type="button" onClick={() => copyCode(block.code!)} aria-label="Copy code"><CopyIcon /></button><pre><code>{block.code}</code></pre></div>}{block.note && <aside><strong>{locale === 'en' ? 'Note' : 'Nota'}</strong><p>{block.note}</p></aside>}</section>)}
        <nav className="docs-pagination">{index > 0 ? <Link to={localisedPath(`/docs/${docs[index - 1].slug}`, locale)}><small>{locale === 'en' ? 'Previous' : 'Anterior'}</small>{docs[index - 1].title}</Link> : <span />}{index < docs.length - 1 && <Link to={localisedPath(`/docs/${docs[index + 1].slug}`, locale)}><small>{locale === 'en' ? 'Next' : 'Seguinte'}</small>{docs[index + 1].title}</Link>}</nav>
      </article>
      <aside className="docs-toc"><span>{locale === 'en' ? 'On this page' : 'Nesta página'}</span>{doc.blocks.map((block) => <a key={block.heading} href={`#${block.heading.toLowerCase().replaceAll(' ', '-')}`}>{block.heading}</a>)}</aside>
    </DocsLayout>
  )
}
