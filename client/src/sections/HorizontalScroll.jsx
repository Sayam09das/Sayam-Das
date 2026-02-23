import { useRef } from 'react'
import useHorizontalScroll from '../animations/useHorizontalScroll'

const panels = [
  {
    title: 'Brand Systems',
    text: 'Identity directions and visual frameworks built for scale.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&fm=webp&w=1400&q=80',
  },
  {
    title: 'Product Interfaces',
    text: 'Conversion-focused UI systems with crisp interaction behavior.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&fm=webp&w=1400&q=80',
  },
  {
    title: 'Web Experiences',
    text: 'High-performance marketing pages with cinematic storytelling.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=webp&w=1400&q=80',
  },
  {
    title: 'Launch Assets',
    text: 'Cross-channel creative packages for product and brand launches.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&fm=webp&w=1400&q=80',
  },
]

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const panelRefs = useRef([])

  useHorizontalScroll({ sectionRef, trackRef, panelRefs })

  return (
    <section
      id="horizontal-showcase"
      ref={sectionRef}
      data-scroll-section
      className="relative overflow-hidden bg-white py-20 dark:bg-[#0F0F0F] md:py-24 lg:py-32"
    >
      <div
        ref={trackRef}
        className="flex w-full flex-col gap-8 px-6 md:px-10 lg:w-[300vw] lg:flex-row lg:gap-10 lg:px-[60px]"
      >
        {panels.map((panel, index) => (
          <article
            key={panel.title}
            ref={(node) => {
              panelRefs.current[index] = node
            }}
            className="flex h-[72vh] w-full flex-shrink-0 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 will-change-transform dark:border-[#2A2A2A] dark:bg-[#1A1A1A] lg:w-[96vw]"
          >
            <img
              src={panel.image}
              alt={panel.title}
              width="1400"
              height="900"
              loading="lazy"
              decoding="async"
              className="h-full w-[58%] object-cover"
            />
            <div className="flex w-[42%] flex-col justify-center p-8 md:p-12">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-4xl">{panel.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-[#BBBBBB] md:text-base">{panel.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
