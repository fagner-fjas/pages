import type { SectionDefinition } from '../types/content'
import AgencyHero from '../components/sections/AgencyHero.vue'
import ClientGallery from '../components/sections/ClientGallery.vue'
import CtaSection from '../components/sections/CtaSection.vue'
import FeatureArticle from '../components/sections/FeatureArticle.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import ProductShowcase from '../components/sections/ProductShowcase.vue'
import ServiceSteps from '../components/sections/ServiceSteps.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'

export const sectionComponents = {
  AgencyHero,
  ServiceSteps,
  ClientGallery,
  ProductShowcase,
  FeatureArticle,
  PricingSection,
  TestimonialsSection,
  CtaSection,
}

export const sectionDefinitions: SectionDefinition[] = [
  {
    type: 'AgencyHero',
    label: 'Hero de agencia',
    defaults: {
      id: 'hero',
      type: 'AgencyHero',
      enabled: true,
      data: {
        eyebrow: 'Welcome On Site',
        title: 'Together, We Are A Digital Creative Agency',
        text: 'Texto principal da landing page.',
        primaryAction: { label: 'Get Started', href: '#contact' },
        secondaryAction: { label: 'Register Now', href: '#pricing' },
        badgeTitle: 'Recognized in 20+ Countries',
        badgeText: 'Resumo curto de autoridade.',
        images: [
          { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80', alt: 'Imagem principal', width: 420, height: 520 },
          { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80', alt: 'Imagem secundaria', width: 300, height: 380 }
        ]
      }
    }
  },
  {
    type: 'ServiceSteps',
    label: 'Passos de servico',
    defaults: {
      id: 'services',
      type: 'ServiceSteps',
      enabled: true,
      data: {
        eyebrow: 'Our Service',
        title: 'A process designed for fast movement',
        action: { label: 'View All', href: '#' },
        items: [
          { number: '01.', title: 'Find Your Problem', text: 'Descricao do passo.' },
          { number: '02.', title: 'Research Your Business', text: 'Descricao do passo.' }
        ]
      }
    }
  },
  {
    type: 'ClientGallery',
    label: 'Galeria de clientes',
    defaults: {
      id: 'clients',
      type: 'ClientGallery',
      enabled: true,
      data: {
        kicker: '0+',
        title: 'Our Client',
        text: 'Descricao da galeria.',
        images: [
          { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80', alt: 'Imagem', width: 330, height: 260 }
        ]
      }
    }
  },
  {
    type: 'ProductShowcase',
    label: 'Produtos',
    defaults: {
      id: 'products',
      type: 'ProductShowcase',
      enabled: true,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: '',
      backgroundTransparent: false,
      data: {
        title: 'Our Products Are Ready To Help Your Business',
        text: 'Descricao do produto.',
        imagePosition: 'left',
        image: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80', alt: 'Produto', width: 560, height: 520 },
        items: [{ title: 'Building Website', text: 'Descricao curta.', href: '' }]
      }
    }
  },
  {
    type: 'FeatureArticle',
    label: 'Artigo em destaque',
    defaults: {
      id: 'article',
      type: 'FeatureArticle',
      enabled: true,
      data: {
        date: '12 Agosto 2026',
        title: 'Business Develops Quickly And Stably With Agency',
        text: 'Resumo do artigo.',
        image: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80', alt: 'Artigo', width: 500, height: 620 },
        posts: [{ title: 'Rapid Development Of Agency Technology Today', text: 'Resumo curto.' }]
      }
    }
  },
  {
    type: 'PricingSection',
    label: 'Tabela de precos',
    defaults: {
      id: 'pricing',
      type: 'PricingSection',
      enabled: true,
      data: {
        title: 'Choose A Price That Suits Your Company',
        text: 'Descricao dos planos.',
        features: ['Secure Technology'],
        plans: [{ name: 'Start', price: '$45', period: '/monthly', features: ['Tellus sed enim'], action: 'Choose' }]
      }
    }
  },
  {
    type: 'TestimonialsSection',
    label: 'Depoimentos',
    defaults: {
      id: 'testimonials',
      type: 'TestimonialsSection',
      enabled: true,
      data: {
        title: 'Feelings Of The Clients',
        items: [{ name: 'Albert Flores', meta: '2026', quote: 'Depoimento do cliente.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }]
      }
    }
  },
  {
    type: 'CtaSection',
    label: 'Chamadas finais',
    defaults: {
      id: 'contact',
      type: 'CtaSection',
      enabled: true,
      data: {
        cards: [{ title: 'Contact Us', text: 'Descricao do contato.', action: { label: 'Our Contact', href: 'mailto:contato@fjas.com.br' } }]
      }
    }
  }
]
