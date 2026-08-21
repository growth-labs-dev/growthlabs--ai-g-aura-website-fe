import type { Locale } from './LocaleContext'

export const siteCopy = {
  en: {
    nav: { product: 'Product', models: 'Models', pricing: 'Pricing', docs: 'Docs', signin: 'Sign in', start: 'Start building', menu: 'Open menu' },
    hero: {
      eyebrow: 'Growth AI · Built for real work',
      title: 'One intelligence. Every way you work.',
      body: 'Powerful Growth models, durable memory and the tools your work depends on — across chat, browser and terminal.',
      primary: 'Start with Growth AI', secondary: 'Explore the platform',
      imageAlt: 'A human portrait transitioning into an intelligent digital system',
    },
    videoOne: {
      eyebrow: 'One continuous workflow', title: 'Move at the speed of thought.',
      body: 'From first prompt to finished work, Growth AI keeps context, finds the right model and stays with you across every surface.',
      items: [['Chat', 'Focused conversations'], ['CLI', 'Work where your code lives'], ['API', 'One secure gateway']],
    },
    platform: {
      eyebrow: 'G-Brain + G-Cortex', title: 'Built to remember. Designed to connect.',
      body: 'G-Brain recalls and captures useful context. G-Cortex makes connected knowledge visible across your projects and tools.',
      link: 'Read the architecture',
      items: [['Memory', 'Context that belongs to you'], ['Models', 'Matched to the work'], ['Connections', 'Always under your control']],
    },
    models: {
      eyebrow: 'Growth model system', title: 'The right depth for every task.',
      body: 'Move from fast everyday work to deep technical reasoning without changing your workflow. Growth routes each request through the access and controls your organisation defines.',
      cards: [
        ['Growth low', 'Fast responses for drafting, classification and everyday tasks.'],
        ['Growth medium', 'Balanced reasoning for product, research and development work.'],
        ['Growth high', 'Maximum depth for demanding engineering and strategic decisions.'],
      ],
    },
    pricing: {
      eyebrow: 'Growth AI access', title: 'Plans that scale with your work.',
      body: 'Choose the Growth AI access level that fits how you build. Sign up to review availability and activation.',
      monthly: 'One-time payment · Lifetime access', popular: 'Best deal', cta: 'Create your account',
      note: 'Plan activation and billing are confirmed after account approval.',
      plans: [
        { name: 'Growth AI Core', old: '€497', price: '€159', description: 'Pay once for lifetime access — 68% off.', features: ['Growth Chat and Growth CLI', 'Growth low and medium models', 'G-Brain memory with G-Cortex visualisation', 'Skills, plugins and approved connections'] },
        { name: 'Growth AI Power', old: '€697', price: '€239', description: 'Pay once for lifetime access — our best deal.', features: ['Everything in Core', 'Growth high model access', 'Local and remote model routing', 'Expanded project workflows'] },
      ],
    },
    footer: { strap: 'Intelligence that keeps working with you.', security: 'Security', terms: 'Terms', privacy: 'Privacy', cookies: 'Cookies', rights: '© 2026 Growth Labs. All rights reserved.' },
  },
  pt: {
    nav: { product: 'Produto', models: 'Modelos', pricing: 'Preços', docs: 'Documentação', signin: 'Entrar', start: 'Começar', menu: 'Abrir menu' },
    hero: {
      eyebrow: 'Growth AI · Criada para trabalho real',
      title: 'Uma inteligência. Todas as formas de trabalhar.',
      body: 'Modelos Growth poderosos, memória duradoura e as ferramentas do seu trabalho — no chat, browser e terminal.',
      primary: 'Começar com Growth AI', secondary: 'Explorar a plataforma',
      imageAlt: 'Retrato humano em transição para um sistema digital inteligente',
    },
    videoOne: {
      eyebrow: 'Um fluxo contínuo', title: 'Avance à velocidade do pensamento.',
      body: 'Do primeiro prompt ao trabalho concluído, a Growth AI preserva o contexto, encontra o modelo certo e acompanha-o em cada ambiente.',
      items: [['Chat', 'Conversas focadas'], ['CLI', 'Trabalho junto ao seu código'], ['API', 'Um gateway seguro']],
    },
    platform: {
      eyebrow: 'G-Brain + G-Cortex', title: 'Construída para lembrar. Desenhada para ligar.',
      body: 'O G-Brain recupera e captura contexto útil. O G-Cortex torna o conhecimento ligado visível nos seus projetos e ferramentas.',
      link: 'Conhecer a arquitetura',
      items: [['Memória', 'Contexto que lhe pertence'], ['Modelos', 'Adequados ao trabalho'], ['Conexões', 'Sempre sob o seu controlo']],
    },
    models: {
      eyebrow: 'Sistema de modelos Growth', title: 'A profundidade certa para cada tarefa.',
      body: 'Passe do trabalho diário rápido ao raciocínio técnico profundo sem mudar o fluxo. A Growth encaminha cada pedido segundo os acessos e controlos definidos pela sua organização.',
      cards: [
        ['Growth low', 'Respostas rápidas para escrita, classificação e tarefas diárias.'],
        ['Growth medium', 'Raciocínio equilibrado para produto, pesquisa e desenvolvimento.'],
        ['Growth high', 'Profundidade máxima para engenharia exigente e decisões estratégicas.'],
      ],
    },
    pricing: {
      eyebrow: 'Acesso Growth AI', title: 'Planos que crescem com o seu trabalho.',
      body: 'Escolha o nível de acesso Growth AI adequado à forma como trabalha. Registe-se para consultar disponibilidade e ativação.',
      monthly: 'Pagamento único · Acesso vitalício', popular: 'Melhor opção', cta: 'Criar a sua conta',
      note: 'A ativação do plano e a faturação são confirmadas após aprovação da conta.',
      plans: [
        { name: 'Growth AI Core', old: '€497', price: '€159', description: 'Pague uma vez para acesso vitalício — 68% de desconto.', features: ['Growth Chat e Growth CLI', 'Modelos Growth low e medium', 'Memória G-Brain com visualização G-Cortex', 'Skills, plugins e conexões aprovadas'] },
        { name: 'Growth AI Power', old: '€697', price: '€239', description: 'Pague uma vez para acesso vitalício — a melhor opção.', features: ['Tudo do Core', 'Acesso ao modelo Growth high', 'Encaminhamento local e remoto', 'Fluxos de projeto expandidos'] },
      ],
    },
    footer: { strap: 'Inteligência que continua a trabalhar consigo.', security: 'Segurança', terms: 'Termos', privacy: 'Privacidade', cookies: 'Cookies', rights: '© 2026 Growth Labs. Todos os direitos reservados.' },
  },
} satisfies Record<Locale, object>
