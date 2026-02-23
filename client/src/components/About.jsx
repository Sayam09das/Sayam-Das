import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import useAboutAnimation from '../animations/useAboutAnimation'
import useCountUp from '../animations/useCountUp'

const stats = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Projects', value: 120, suffix: '+' },
  { label: 'Clients', value: 80, suffix: '+' },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageInnerRef = useRef(null)
  const contentRef = useRef(null)
  const lineRef = useRef(null)
  const statsRef = useRef(null)
  const numberRefs = useRef([])

  useAboutAnimation({ sectionRef, imageWrapRef, imageInnerRef, contentRef, lineRef })
  useCountUp({ statsRef, numberRefs, stats })

  const hoverTransition = useMemo(() => ({ duration: 0.4, ease: 'easeOut' }), [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F0F5DD] px-6 py-20 transition-colors duration-300 dark:bg-[#121212] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div data-depth="background" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(198,245,77,0.14),transparent_38%),radial-gradient(circle_at_84%_78%,rgba(184,233,58,0.12),transparent_44%)]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 text-center md:gap-16 lg:grid-cols-2 lg:gap-20 lg:text-left 2xl:gap-24">
        <motion.div
          ref={imageWrapRef}
          whileHover={{ scale: 1.03 }}
          transition={hoverTransition}
          className="relative overflow-hidden rounded-lg shadow-lg will-change-transform"
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent" />
          <img
            ref={imageInnerRef}
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&fm=webp&w=1200&q=80"
            alt="About portrait"
            width="1200"
            height="1600"
            loading="lazy"
            decoding="async"
            className="h-[340px] w-full scale-[1.04] object-cover will-change-transform sm:h-[420px] md:h-[500px] lg:h-[560px]"
          />
        </motion.div>

        <div ref={contentRef} className="mx-auto flex max-w-[600px] flex-col lg:mx-0">
          <h2 data-about-text className="text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl 2xl:text-6xl">
            About Me
          </h2>

          <div ref={lineRef} className="mx-auto mt-5 h-[2px] w-24 bg-zinc-900 dark:bg-white lg:mx-0" />

          <p data-about-text className="mt-8 text-base leading-[1.7] text-[#555] dark:text-[#BBBBBB] md:text-lg">
            I am a creative developer focused on building immersive web experiences. My work
            combines motion design, 3D systems, and performance-first engineering to create
            interactions that feel intentional and alive.
          </p>

          <p data-about-text className="mt-5 text-base leading-[1.7] text-[#555] dark:text-[#BBBBBB] md:text-lg">
            I engineer animation architecture, interaction systems, and scalable UI foundations
            that stay expressive while remaining production-ready and fast.
          </p>

          <div
            ref={statsRef}
            data-about-text
            className="mt-12 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16 lg:justify-start"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group cursor-pointer"
              >
                <p
                  ref={(node) => {
                    numberRefs.current[index] = node
                  }}
                  className="text-3xl font-bold text-black transition-colors duration-300 group-hover:text-zinc-950 dark:text-white dark:group-hover:text-zinc-200 lg:text-5xl"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-2 text-sm uppercase tracking-wide text-[#777] dark:text-[#BBBBBB]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
