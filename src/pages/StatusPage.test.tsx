import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LocaleProvider } from '../i18n/LocaleContext'
import StatusPage from './StatusPage'

vi.mock('../components/DocsLayout', () => ({ DocsLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }))

describe('StatusPage', () => {
  beforeEach(() => { vi.restoreAllMocks() })
  it('does not invent service metrics when the API is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'))
    render(<MemoryRouter><LocaleProvider><StatusPage /></LocaleProvider></MemoryRouter>)
    await waitFor(() => expect(screen.getByText('Status data is unavailable')).toBeInTheDocument())
    expect(screen.getAllByText('Not reported').length).toBeGreaterThan(5)
  })
})
