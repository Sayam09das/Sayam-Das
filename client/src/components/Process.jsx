import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useProcessAnimation from '../animations/useProcessAnimation'

const processSteps = [
  {
    number: '01',
    title: 'Research',
    description:
      'I audit your brand, audience, and product goals to establish clear direction and measurable design priorities.',
  },
  {
    number: '02',
    title: 'Wireframing',
    description:
      'I map core flows and information hierarchy, turning ideas into structured experiences before visual styling begins.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'I craft polished UI, interaction behavior, and scalable visual systems tailored to your product and brand voice.',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'I hand off organized files and implementation guidance so development can move fast with confidence and consistency.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const horizontalLineRef = useRef(null)
  const verticalLineRef = useRef(null)
  const stepsRef = useRef([])
  const circlesRef = useRef([])
  const numbersRef = useRef([])
  const [hoverEnabled, setHoverEnabled] = useState(false)

  useProcessAnimation({
    sectionRef,
    horizontalLineRef,
    verticalLineRef,
    stepsRef,
    circlesRef,
    numbersRef,
  })

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    setHoverEnabled(isDesktop && !coarsePointer)
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F0EEFF] px-6 py-20 transition-colors duration-300 dark:bg-[#1a1528] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div data-process-sticky className="mx-auto mb-24 max-w-[740px] text-center md:mb-[100px]">
        <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl 2xl:text-6xl">My Process</h2>
        <p className="mx-auto mt-5 max-w-[600px] text-base text-[#555] dark:text-[#BBBBBB] md:text-lg">
          A clear, collaborative process that keeps every project aligned from strategy and structure to final visual execution.
        </p>
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div
          ref={horizontalLineRef}
          className="pointer-events-none absolute left-0 right-0 top-10 z-0 hidden h-[2px] bg-black dark:bg-white md:block 2xl:h-[3px]"
        />

        <div
          ref={verticalLineRef}
          className="pointer-events-none absolute bottom-0 left-[31px] top-2 z-0 block w-[2px] bg-black dark:bg-white md:hidden"
        />

        <div className="relative z-10 flex flex-col gap-16 text-left md:flex-row md:items-start md:justify-between md:gap-16 md:text-center 2xl:gap-24">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.number}
              data-process-step
              ref={(node) => {
                stepsRef.current[index] = node
              }}
              whileHover={
                hoverEnabled
                  ? {
                      y: -6,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }
                  : undefined
              }
              className="relative flex-1 will-change-transform"
            >
              <motion.div
                ref={(node) => {
                  circlesRef.current[index] = node
                }}
                whileHover={
                  hoverEnabled
                    ? {
                        scale: 1.05,
                        boxShadow: '0 16px 34px rgba(0,0,0,0.14)',
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }
                    : undefined
                }
                className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white text-xl font-bold text-black will-change-transform dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:text-white md:mx-auto md:h-20 md:w-20 md:text-2xl 2xl:h-[88px] 2xl:w-[88px]"
              >
                <span
                  ref={(node) => {
                    numbersRef.current[index] = node
                  }}
                >
                  {step.number}
                </span>
              </motion.div>

              <h3 className="mb-4 text-lg font-semibold text-black dark:text-white md:text-xl">{step.title}</h3>
              <p className="max-w-none text-sm leading-relaxed text-gray-600 dark:text-[#BBBBBB] md:mx-auto md:max-w-[260px] md:text-base">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
