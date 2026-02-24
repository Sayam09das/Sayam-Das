import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import usePortfolioAnimation from '../animations/usePortfolioAnimation'
import ShaderImageReveal from './ShaderImageReveal'
import useIsMobile from '../hooks/useIsMobile'

const tabs = ['All', 'Branding', 'UI', 'Web']
const caseStudyFlow = [
  {
    step: '01',
    title: 'Context',
    copy: 'Define client, market, and project constraints before visual direction.',
  },
  {
    step: '02',
    title: 'Problem',
    copy: 'Pinpoint friction points and identify where interaction can unlock clarity.',
  },
  {
    step: '03',
    title: 'Strategy',
    copy: 'Map motion language, UX hierarchy, and technology choices to outcomes.',
  },
  {
    step: '04',
    title: 'Execution',
    copy: 'Build performant interfaces with deliberate UI detail and animation architecture.',
  },
  {
    step: '05',
    title: 'Results',
    copy: 'Measure speed, engagement, conversion lift, and perceived product quality.',
  },
]

const projects = [
  {
    id: 1,
    title: 'Nova Brand System',
    description: 'Visual identity and rollout for a fast-growing SaaS startup.',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 2,
    title: 'Pulse Product Dashboard',
    description: 'Data-rich dashboard experience focused on usability and speed.',
    category: 'UI',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 3,
    title: 'Atelier Studio Website',
    description: 'Immersive web experience for a boutique creative agency.',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 4,
    title: 'Arc Mobile Commerce',
    description: 'Mobile-first commerce interface with frictionless checkout flows.',
    category: 'UI',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 5,
    title: 'Monolith Rebrand',
    description: 'Positioning, identity and campaign language for enterprise market.',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 6,
    title: 'Helio Marketing Site',
    description: 'High-converting marketing website with modular sections.',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1400&q=80',
  },
]

export default function Portfolio() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('All')
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const imagesRef = useRef([])

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return projects
    return projects.filter((project) => project.category === activeTab)
  }, [activeTab])

  usePortfolioAnimation({ sectionRef, cardsRef, imagesRef, items: filteredProjects })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5F6ED] px-6 py-20 transition-colors duration-300 dark:bg-[#0F0F0F] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div className="mx-auto mb-20 max-w-[760px] text-center">
        <h2 className="text-3xl font-bold tracking-[-0.5px] text-black dark:text-white md:text-4xl lg:text-5xl 2xl:text-6xl">
          Selected Projects
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-base text-[#555] dark:text-[#BBBBBB] md:text-lg">
          A curated selection of branding, interface, and web projects crafted for clarity,
          conversion, and memorable digital experiences.
        </p>
      </div>

      <div className="mb-14 overflow-x-auto">
        <div className="mx-auto flex min-w-max items-center justify-center gap-8 px-2">
          {tabs.map((tab) => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="relative cursor-pointer whitespace-nowrap pb-2 text-sm font-medium transition-colors duration-300"
              >
                <span className={isActive ? 'text-[#B8E93A]' : 'text-zinc-700 hover:text-[#B8E93A] dark:text-[#BBBBBB]'}>{tab}</span>
                {isActive && (
                  <motion.span
                    layoutId="portfolio-tab-underline"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#B8E93A]"
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-16 2xl:gap-20">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              ref={(node) => {
                cardsRef.current[index] = node
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              whileHover={isMobile ? undefined : 'hover'}
              whileTap="tap"
              variants={{
                hover: { y: -10, boxShadow: '0 24px 46px rgba(0,0,0,0.14)' },
                tap: { scale: 0.98 },
              }}
              className="group overflow-hidden rounded-xl"
            >
              <div className="relative cursor-pointer overflow-hidden rounded-xl shadow-sm">
                {index === 0 && !isMobile ? (
                  <motion.div
                    ref={(node) => {
                      imagesRef.current[index] = node
                    }}
                    className="h-[260px] w-full will-change-transform md:h-[320px] lg:h-[400px]"
                    variants={{ hover: { scale: 1.08 } }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <ShaderImageReveal
                      imageUrl={project.image}
                      className="h-full w-full"
                      alt={project.title}
                    />
                  </motion.div>
                ) : (
                  <motion.img
                    ref={(node) => {
                      imagesRef.current[index] = node
                    }}
                    src={project.image}
                    alt={project.title}
                    width="1400"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="h-[260px] w-full object-cover will-change-transform md:h-[320px] lg:h-[400px]"
                    variants={{ hover: { scale: 1.08 } }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                )}

                {!isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    variants={{ hover: { opacity: 1 }, tap: { opacity: 1 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
                  >
                    <button
                      type="button"
                      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900"
                    >
                      View Case Study
                    </button>
                  </motion.div>
                )}
              </div>

              <div className="px-1 pb-2 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B8E93A]">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555] dark:text-[#BBBBBB] md:text-base">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="token-divider mx-auto mt-20 max-w-[1440px]" />

      <div className="mx-auto mt-16 max-w-[1440px]">
        <h3 className="text-2xl font-bold tracking-[-0.02em] text-zinc-900 dark:text-white md:text-3xl">
          Case Study Storytelling System
        </h3>
        <p className="mt-4 max-w-[760px] text-sm leading-7 text-[#555] dark:text-[#BBBBBB] md:text-base">
          Every project follows a structured narrative to show both design craft and engineering decision-making with measurable outcomes.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {caseStudyFlow.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#E2E8C0] bg-[#EEF2D3] p-5 shadow-sm dark:border-[#2A2A2A] dark:bg-[#1A1A1A]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B8E93A]">{item.step}</p>
              <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-white">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#555] dark:text-[#BBBBBB]">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
