import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Atom,
  Braces,
  Figma,
  Flame,
  GitBranch,
  Layers,
  Paintbrush,
  Server,
  Sparkles,
  Wind,
} from 'lucide-react'
import useSkillsAnimation from '../animations/useSkillsAnimation'
import useIsMobile from '../hooks/useIsMobile'

const skills = [
  { icon: Atom, title: 'React', desc: 'Component architecture and scalable frontend systems.', years: '5+ years', progress: 95 },
  { icon: Wind, title: 'Tailwind CSS', desc: 'Design systems and high-speed responsive UI building.', years: '4+ years', progress: 92 },
  { icon: Flame, title: 'GSAP + Motion', desc: 'High-end animation systems and scroll storytelling.', years: '4+ years', progress: 90 },
  { icon: Server, title: 'Node + Express', desc: 'Backend APIs and full-stack product delivery.', years: '4+ years', progress: 84 },
  { icon: Sparkles, title: 'Three.js / WebGL', desc: 'Interactive shader effects and immersive visuals.', years: '3+ years', progress: 82 },
  { icon: Paintbrush, title: 'Design + Prototyping', desc: 'UI/UX design, motion specs, and product thinking.', years: '6+ years', progress: 94 },
  { icon: Layers, title: 'Framer Motion', desc: 'Micro-interactions and page transition orchestration.', years: '4+ years', progress: 91 },
  { icon: Figma, title: 'Figma', desc: 'Design systems, wireframes, and team collaboration.', years: '6+ years', progress: 93 },
  { icon: GitBranch, title: 'Git + Vercel', desc: 'Versioned workflows and production deployments.', years: '5+ years', progress: 88 },
]

export default function Skills() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRefs = useRef([])
  const barRefs = useRef([])
  const countRefs = useRef([])
  const bgRef = useRef(null)

  useSkillsAnimation({ sectionRef, headingRef, cardRefs, barRefs, countRefs, bgRef })

  const hover = useMemo(() => ({ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }), [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-scroll-section
      className="relative w-full overflow-hidden bg-[#F5F6ED] px-6 py-20 transition-colors duration-300 dark:bg-[#0F0F0F] md:px-10 md:py-24 lg:px-[60px] lg:py-32"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(198,245,77,0.2),transparent_44%),radial-gradient(circle_at_82%_76%,rgba(184,233,58,0.18),transparent_40%)]"
      />

      <div ref={headingRef} className="mx-auto mb-16 max-w-[760px] text-center md:mb-20">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl 2xl:text-6xl">
          Skills & Expertise
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-base text-zinc-600 dark:text-[#BBBBBB] md:text-lg">
          From React architecture to shader programming, I approach development as a creative medium, not just a technical implementation.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.article
              key={skill.title}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              whileHover={isMobile ? undefined : hover}
              whileTap={{ scale: 0.98 }}
              className={`group rounded-2xl border border-[#E2E8C0] bg-[#EEF2D3] p-7 shadow-sm will-change-transform transition-colors duration-300 hover:border-[#B8E93A] hover:shadow-[0_20px_50px_rgba(184,233,58,0.2)] dark:border-[#2A2A2A] dark:bg-[#1A1A1A] ${isMobile ? '' : '[transform-style:preserve-3d]'}`}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="mb-6 inline-flex rounded-xl border border-[#E2E8C0] p-3 text-zinc-900 dark:border-[#2A2A2A] dark:text-white"
              >
                <Icon size={22} />
              </motion.div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{skill.title}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B8E93A]">{skill.years}</span>
              </div>

              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-[#BBBBBB]">{skill.desc}</p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.12em] text-zinc-500 dark:text-[#BBBBBB]">Proficiency</span>
                  <span
                    ref={(node) => {
                      countRefs.current[index] = node
                    }}
                    data-count={skill.progress}
                    className="text-sm font-semibold text-zinc-900 dark:text-white"
                  >
                    0%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-[#2A2A2A]">
                  <div
                    ref={(node) => {
                      barRefs.current[index] = node
                    }}
                    data-progress={skill.progress}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-[#B8E93A] to-[#C6F54D] will-change-transform"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
