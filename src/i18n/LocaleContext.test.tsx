import { fireEvent, render, screen } from '@testing-library/react'
import { LocaleProvider, useLocale } from './LocaleContext'

function TestView() {
  const { locale, setLocale } = useLocale()
  return <button onClick={() => setLocale(locale === 'en' ? 'pt' : 'en')}>{locale}</button>
}

describe('LocaleProvider', () => {
  beforeEach(() => window.history.replaceState({}, '', '/'))
  it('defaults to English and writes a Portuguese URL preference', () => {
    render(<LocaleProvider><TestView /></LocaleProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'en' }))
    expect(screen.getByRole('button', { name: 'pt' })).toBeInTheDocument()
    expect(window.location.search).toBe('?lang=pt')
  })
})
