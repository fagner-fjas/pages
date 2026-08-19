export type MenuItem = {
  label: string
  href: string
  kind: 'section' | 'external' | 'page'
}

export type ImageField = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type LinkField = {
  label: string
  href: string
}

export type PageSection = {
  id: string
  type: string
  enabled: boolean
  data: Record<string, unknown>
}

export type LandingPage = {
  id: string
  title: string
  slug: string
  menu: MenuItem[]
  sections: PageSection[]
}

export type SiteContent = {
  site: {
    brand: string
    description: string
    defaultPageId: string
  }
  pages: LandingPage[]
}

export type SectionDefinition = {
  type: string
  label: string
  defaults: PageSection
}
