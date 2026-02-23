import { useEffect } from 'react'

const DEFAULTS = {
  title: 'Digital Designer | Product Designer Portfolio',
  description: 'Freelance product designer specializing in UI/UX, branding, and web design.',
  keywords: 'product designer, ui ux designer, branding designer, freelance web designer, portfolio',
  image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
  url: 'https://example.com',
  type: 'website',
}

function setMeta(attr, key, value) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export default function SEO({ title, description, keywords, image, url, type }) {
  useEffect(() => {
    const data = {
      title: title || DEFAULTS.title,
      description: description || DEFAULTS.description,
      keywords: keywords || DEFAULTS.keywords,
      image: image || DEFAULTS.image,
      url: url || DEFAULTS.url,
      type: type || DEFAULTS.type,
    }

    document.title = data.title
    setMeta('name', 'description', data.description)
    setMeta('name', 'keywords', data.keywords)
    setMeta('property', 'og:title', data.title)
    setMeta('property', 'og:description', data.description)
    setMeta('property', 'og:image', data.image)
    setMeta('property', 'og:type', data.type)
    setMeta('property', 'og:url', data.url)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', data.title)
    setMeta('name', 'twitter:description', data.description)
    setMeta('name', 'twitter:image', data.image)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', data.url)
  }, [title, description, keywords, image, url, type])

  return null
}
