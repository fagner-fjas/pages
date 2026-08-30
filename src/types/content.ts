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

export type HeaderConfig = {
  brandName: string
  useLogo: boolean
  logo: ImageField
  backgroundOpacity?: number
  blur?: number
}

export type FooterConfig = {
  enabled: boolean
  text: string
  links: LinkField[]
}

export type PaletteConfig = {
  pageBackground: string
  surface: string
  mutedSurface: string
  text: string
  heading: string
  softText: string
  border: string
  accent: string
  dark: string
  darkSoftText: string
  highlight: string
}

export type PageSection = {
  id: string
  type: string
  enabled: boolean
  marginTop?: number
  marginBottom?: number
  backgroundColor?: string
  backgroundTransparent?: boolean
  data: Record<string, unknown>
}

export type LandingPage = {
  id: string
  title: string
  slug: string
  menu: MenuItem[]
  footer?: FooterConfig
  sections: PageSection[]
}

export type SiteContent = {
  site: {
    brand: string
    description: string
    defaultPageId: string
    header?: HeaderConfig
    palette?: PaletteConfig
  }
  pages: LandingPage[]
}

export type SectionDefinition = {
  type: string
  label: string
  defaults: PageSection
}
