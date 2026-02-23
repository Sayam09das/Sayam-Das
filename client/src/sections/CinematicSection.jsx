import { useRef } from 'react'
import useCinematicScroll from '../animations/useCinematicScroll'

export default function CinematicSection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const darkenRef = useRef(null)
  const maskRef = useRef(null)
  const depthBgRef = useRef(null)
  const depthMidRef = useRef(null)
  const depthFgRef = useRef(null)

  useCinematicScroll({
    sectionRef,
    headlineRef,
    imageRef,
    textRef,
    darkenRef,
    maskRef,
    depthBgRef,
    depthMidRef,
    depthFgRef,
  })

  return (
    <section
      id="cinematic"
      ref={sectionRef}
      data-scroll-section
      className="relative h-[300vh] overflow-clip bg-white dark:bg-[#0F0F0F]"
    >
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-40 origin-top bg-white will-change-transform dark:bg-[#0F0F0F]"
      />

      <div className="sticky top-0 h-screen overflow-hidden [perspective:1200px]">
        <div
          ref={depthBgRef}
          className="absolute inset-0 will-change-transform bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.12),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.14),transparent_45%)]"
        />

        <div
          ref={depthMidRef}
          className="absolute inset-0 will-change-transform"
        >
          <div className="absolute left-[8%] top-[16%] h-44 w-44 rounded-full bg-violet-300/20 blur-2xl dark:bg-violet-500/10" />
          <div className="absolute bottom-[16%] right-[10%] h-52 w-52 rounded-full bg-sky-300/20 blur-2xl dark:bg-sky-500/10" />
        </div>

        <div ref={depthFgRef} className="relative z-10 flex h-full items-center justify-center will-change-transform px-6 md:px-12">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=webp&w=1800&q=80"
            alt="Cinematic product reveal"
            width="1800"
            height="1100"
            loading="lazy"
            decoding="async"
            className="h-[68vh] w-[88vw] max-w-[1200px] rounded-3xl object-cover will-change-transform"
          />

          <div
            ref={darkenRef}
            className="pointer-events-none absolute inset-0 bg-black opacity-10"
          />

          <h2
            ref={headlineRef}
            className="pointer-events-none absolute text-center text-4xl font-black tracking-[-0.04em] text-zinc-900 will-change-transform dark:text-white md:text-6xl lg:text-7xl"
          >
            Crafted For Impact
          </h2>

          <p
            ref={textRef}
            className="pointer-events-none absolute right-[6%] top-[54%] max-w-[420px] text-sm leading-7 text-zinc-100 will-change-transform md:text-base"
          >
            Every scroll frame is tuned for narrative clarity, premium motion language, and cinematic pacing.
          </p>
        </div>
      </div>
    </section>
  )
}
