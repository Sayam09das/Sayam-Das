import { useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../animations/useScrollReveal'

const testimonials = [
  {
    name: 'Ananya Patel',
    role: 'Founder, Craftera',
    quote:
      'The design quality and motion thinking transformed our product perception immediately. Users now trust us faster.',
  },
  {
    name: 'David Kim',
    role: 'Product Lead, Pulse',
    quote:
      'Every screen felt intentional. We shipped faster because the system was clear for both design and development.',
  },
  {
    name: 'Mia Rodriguez',
    role: 'Marketing Director, Helio',
    quote:
      'Our launch site finally looked premium and performed well. Engagement jumped in the first week after release.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  useScrollReveal({ scopeRef: sectionRef })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-[linear-gradient(160deg,#141414_0%,#1D1D1D_52%,#111111_100%)] px-6 py-20 text-white transition-colors duration-300 dark:bg-[linear-gradient(160deg,#0F0F0F_0%,#151515_52%,#0E0E0E_100%)] md:px-10 md:py-24 lg:px-[60px] lg:py-32 2xl:px-[120px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal className="mx-auto mb-16 max-w-[680px] text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Testimonials</h2>
          <p className="mt-5 text-base text-zinc-300 md:text-lg">
            Feedback from teams and founders I have partnered with across product, brand, and growth projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              data-reveal
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-2xl border border-white/12 bg-white/5 p-8 shadow-sm backdrop-blur-md"
            >
              <p className="text-sm leading-7 text-zinc-200">“{item.quote}”</p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
