import { useRef } from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'
import DecorativeElements from './DecorativeElements'
import useHeroScrollAnimation from '../animations/useHeroScrollAnimation'
import useParallax from '../animations/useParallax'

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const portraitRef = useRef(null)
  const badgeRef = useRef(null)
  const sparklesRef = useRef(null)
  const wavesRef = useRef(null)

  useHeroScrollAnimation({ sectionRef, bgRef, contentRef, portraitRef, badgeRef })
  useParallax({ sectionRef, sparklesRef, wavesRef })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-20 pt-28 transition-colors duration-300 sm:px-8 md:px-10 lg:px-[60px]"
    >
      <div
        ref={bgRef}
        data-depth="background"
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform bg-[linear-gradient(180deg,#F5F6ED_0%,#EEF2D3_52%,#F0F5DD_100%)] dark:bg-[linear-gradient(180deg,#121212_0%,#131622_52%,#1a1322_100%)]"
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 md:gap-12 lg:grid-cols-2 lg:gap-20">
        <HeroLeft contentRef={contentRef} />
        <HeroRight portraitRef={portraitRef} badgeRef={badgeRef} />
      </div>

      <DecorativeElements sparklesRef={sparklesRef} wavesRef={wavesRef} />
    </section>
  )
}
