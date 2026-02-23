import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brush, Layers, Rocket, Sparkles, Smartphone, Target } from 'lucide-react'
import useServicesAnimation from '../animations/useServicesAnimation'

const services = [
  {
    icon: Brush,
    title: 'Brand Identity Design',
    description: 'Distinct visual systems, logo directions, and art direction to make your brand instantly recognizable across every touchpoint.',
  },
  {
    icon: Layers,
    title: 'UI/UX Product Design',
    description: 'Conversion-first interfaces and component systems that improve usability, retention, and product clarity for modern platforms.',
  },
  {
    icon: Rocket,
    title: 'Launch Design Support',
    description: 'End-to-end launch assets, landing pages, and storytelling visuals engineered for velocity without sacrificing polish.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Web Design',
    description: 'Mobile-to-desktop layouts with precise hierarchy, fluid spacing, and clean implementation-ready design decisions.',
  },
  {
    icon: Target,
    title: 'Conversion Optimization',
    description: 'Strategic redesign and interaction tuning to reduce friction, sharpen value communication, and lift conversion rates.',
  },
  {
    icon: Sparkles,
    title: 'Motion & Micro Interactions',
    description: 'Purposeful animation language for feedback, hierarchy, and delight that enhances perception without hurting performance.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const decorativeRef = useRef(null)
  const cardsRef = useRef([])

  useServicesAnimation({ sectionRef, cardsRef, bgRef, decorativeRef })

  const cardVariants = useMemo(
    () => ({
      rest: {
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      hover: {
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.2, ease: 'easeOut' },
      },
    }),
    [],
  )

  const iconVariants = useMemo(
    () => ({
      rest: { rotate: 0, scale: 1 },
      hover: {
        rotate: 5,
        scale: 1.06,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
    }),
    [],
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5F6ED] px-6 py-20 transition-colors duration-300 dark:bg-[#0F0F0F] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div
        ref={bgRef}
        data-depth="background"
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform bg-[radial-gradient(circle_at_20%_20%,rgba(198,245,77,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(184,233,58,0.16),transparent_45%)]"
      />

      <motion.div
        ref={decorativeRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-32px] top-20 h-32 w-32 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 opacity-80 blur-[1px] will-change-transform dark:from-zinc-800 dark:to-zinc-700"
      />

      <div className="mx-auto mb-20 max-w-[720px] text-center">
        <h2 className="text-3xl font-bold tracking-[-0.5px] text-black dark:text-white md:text-4xl lg:text-5xl 2xl:text-6xl">
          Services
        </h2>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto mt-4 h-[2px] w-24 origin-left bg-[#B8E93A] dark:bg-[#C6F54D]"
        />
        <p className="mx-auto mt-5 max-w-[600px] text-base leading-[1.6] text-[#555] dark:text-[#BBBBBB] lg:text-lg">
          From strategy to execution, I deliver design systems and product experiences that are visually distinct, conversion-focused, and production-ready.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12 2xl:gap-14">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.article
              key={service.title}
              ref={(node) => {
                cardsRef.current[index] = node
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#E2E8C0] bg-[#EEF2D3] p-8 will-change-transform [transition:border-color_0.3s_ease,box-shadow_0.3s_ease] hover:border-[#B8E93A] hover:shadow-xl dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:hover:border-[#C6F54D]"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-50/0 via-zinc-100/0 to-zinc-200/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <motion.div variants={iconVariants} className="relative mb-6 w-fit text-black dark:text-white">
                <Icon size={40} strokeWidth={2} />
              </motion.div>

              <h3 className="relative mb-4 text-lg font-semibold text-zinc-900 dark:text-white lg:text-xl">{service.title}</h3>
              <p className="relative text-sm leading-[1.6] text-[#555] dark:text-[#BBBBBB] md:text-base">{service.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
