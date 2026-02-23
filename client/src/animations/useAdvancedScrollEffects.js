import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function useAdvancedScrollEffects({
  progressRef,
  bgLayerRefs,
  floatingRefs,
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const lowEndDevice = (navigator.hardwareConcurrency || 8) <= 4
    const enableHeavyEffects = !prefersReducedMotion && !isMobile && !lowEndDevice

    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }

      const sections = gsap.utils.toArray('[data-scroll-section]')
      const layers = (bgLayerRefs.current || []).filter(Boolean)

      const setActiveLayer = (index) => {
        if (!layers.length) return
        const activeIndex = index % layers.length
        layers.forEach((layer, layerIndex) => {
          gsap.to(layer, {
            opacity: layerIndex === activeIndex ? 1 : 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: true,
          })
        })
      }

      if (layers.length) {
        setActiveLayer(0)
        sections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveLayer(index),
            onEnterBack: () => setActiveLayer(index),
          })
        })
      }

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { clipPath: 'inset(0% 0% 12% 0%)', opacity: 0.85 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: isMobile ? 0.7 : 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      if (enableHeavyEffects) {
        sections.forEach((section) => {
          const bgLayer = section.querySelector('[data-depth="background"]')
          const fgNodes = section.querySelectorAll('article, [data-depth="foreground"], img')
          const textNodes = section.querySelectorAll('h1, h2, h3, p')

          if (bgLayer) {
            gsap.to(bgLayer, {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          }

          gsap.to(Array.from(fgNodes).slice(0, 6), {
            yPercent: 8,
            ease: 'none',
            stagger: 0.03,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })

          gsap.to(Array.from(textNodes).slice(0, 6), {
            yPercent: -4,
            ease: 'none',
            stagger: 0.02,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

        const zoomImages = gsap.utils.toArray('#about img, #projects img')
        zoomImages.forEach((image) => {
          gsap.fromTo(
            image,
            { scale: 1, y: 0 },
            {
              scale: 1.15,
              y: -26,
              ease: 'none',
              scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })

        const skewTargets = gsap.utils.toArray('section h1, section h2, section h3, section p')
        const setters = skewTargets.map((el) => gsap.quickSetter(el, 'skewY', 'deg'))
        const proxy = { skew: 0 }

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const nextSkew = clamp(self.getVelocity() / -600, -6, 6)
            if (Math.abs(nextSkew) <= Math.abs(proxy.skew)) return

            proxy.skew = nextSkew
            gsap.to(proxy, {
              skew: 0,
              duration: 0.65,
              ease: 'power3.out',
              overwrite: true,
              onUpdate: () => {
                setters.forEach((set) => set(proxy.skew))
              },
            })
          },
        })

        const processSection = document.querySelector('#process')
        if (processSection) {
          const stickyTarget = processSection.querySelector('[data-process-sticky]')
          const stepCards = processSection.querySelectorAll('[data-process-step]')

          if (stickyTarget) {
            ScrollTrigger.create({
              trigger: processSection,
              start: 'top top+=80',
              end: '+=480',
              pin: stickyTarget,
              pinSpacing: false,
              scrub: true,
            })
          }

          gsap.fromTo(
            stepCards,
            { opacity: 1, scale: 1 },
            {
              opacity: 0.7,
              scale: 0.94,
              stagger: 0.06,
              ease: 'none',
              scrollTrigger: {
                trigger: processSection,
                start: 'top center',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        }
      }

      const decorative = (floatingRefs.current || []).filter(Boolean)
      decorative.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -20 : -14,
          x: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        if (!isMobile && !prefersReducedMotion) {
          gsap.to(node, {
            yPercent: index % 2 === 0 ? 14 : -10,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          })
        }
      })
    })

    return () => {
      ctx.revert()
    }
  }, [progressRef, bgLayerRefs, floatingRefs])
}
