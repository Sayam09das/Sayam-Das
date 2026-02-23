import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageWrapper from './components/PageWrapper'
import SEO from './components/SEO'
import WebGLBackground from './components/WebGLBackground'
import SimpleLoader from './components/SimpleLoader'
import WebGLNavigationTransition from './components/WebGLNavigationTransition'
import CursorGlow from './components/CursorGlow'
import useLenis from './animations/useLenis'
import useAdvancedScrollEffects from './animations/useAdvancedScrollEffects'
import useScrollVelocity from './animations/useScrollVelocity'
import useScrollManager from './animations/useScrollManager'

const Hero = lazy(() => import('./sections/Hero'))
const CinematicSection = lazy(() => import('./sections/CinematicSection'))
const Services = lazy(() => import('./sections/Services'))
const Skills = lazy(() => import('./sections/Skills'))
const About = lazy(() => import('./sections/About'))
const CreativeEngineeringApproach = lazy(() => import('./sections/CreativeEngineeringApproach'))
const Portfolio = lazy(() => import('./sections/Portfolio'))
const HorizontalScroll = lazy(() => import('./sections/HorizontalScroll'))
const Process = lazy(() => import('./sections/Process'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const Contact = lazy(() => import('./sections/Contact'))

const sectionFallback = <div className="h-[40vh] w-full animate-pulse bg-[#EEF2D3] dark:bg-[#121212]" />

export default function App() {
  const [loading, setLoading] = useState(true)
  const progressRef = useRef(null)
  const bgLayerRefs = useRef([])
  const floatingRefs = useRef([])

  const { isScrollLocked, unlockScroll } = useScrollManager({ initialLocked: true })

  useLenis({ paused: isScrollLocked })
  useAdvancedScrollEffects({ progressRef, bgLayerRefs, floatingRefs })
  useScrollVelocity()

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
    unlockScroll()
  }, [unlockScroll])

  return (
    <div className="min-h-screen bg-[#F5F6ED] text-zinc-900 transition-colors duration-300 dark:bg-[#0F0F0F] dark:text-white">
      {loading && <SimpleLoader onComplete={handleLoaderComplete} duration={1200} />}
      <CursorGlow />

      {loading ? (
        <div className="pointer-events-none fixed inset-0 -z-30 bg-black" />
      ) : (
        <WebGLBackground introProgress={1} paused={false} />
      )}
      <WebGLNavigationTransition enabled={!loading} />

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div
          ref={(node) => {
            bgLayerRefs.current[0] = node
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#F5F6ED] via-[#EEF2D3] to-[#F5F6ED] opacity-100 transition-opacity duration-700 dark:from-[#0F0F0F] dark:via-[#121212] dark:to-[#0F0F0F]"
        />
        <div
          ref={(node) => {
            bgLayerRefs.current[1] = node
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#EEF2D3] via-[#F5F6ED] to-[#EAF2C2] opacity-0 transition-opacity duration-700 dark:from-[#171326] dark:via-[#161922] dark:to-[#201726]"
        />
        <div
          ref={(node) => {
            bgLayerRefs.current[2] = node
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#F0F5DD] via-[#F5F6ED] to-[#EEF2D3] opacity-0 transition-opacity duration-700 dark:from-[#111827] dark:via-[#1a1420] dark:to-[#10201a]"
        />
      </div>

      <div
        ref={progressRef}
        className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-[#B8E93A] dark:bg-[#C6F54D]"
        style={{ transform: 'scaleX(0)' }}
      />

      <div
        ref={(node) => {
          floatingRefs.current[0] = node
        }}
        className="pointer-events-none fixed left-8 top-[24%] z-[5] h-28 w-28 rounded-full bg-[#C6F54D]/20 blur-xl dark:bg-violet-500/10"
      />
      <div
        ref={(node) => {
          floatingRefs.current[1] = node
        }}
        className="pointer-events-none fixed bottom-[20%] right-10 z-[5] h-24 w-24 rounded-full bg-[#B8E93A]/18 blur-xl dark:bg-sky-500/10"
      />
      <div
        ref={(node) => {
          floatingRefs.current[2] = node
        }}
        className="pointer-events-none fixed right-[42%] top-[68%] z-[5] h-20 w-20 rounded-full bg-amber-200/20 blur-xl dark:bg-amber-400/10"
      />

      <SEO />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={sectionFallback}>
            <PageWrapper sectionKey="hero">
              <Hero />
            </PageWrapper>
            <PageWrapper sectionKey="cinematic">
              <CinematicSection />
            </PageWrapper>
            <PageWrapper sectionKey="services">
              <Services />
            </PageWrapper>
            <PageWrapper sectionKey="skills">
              <Skills />
            </PageWrapper>
            <PageWrapper sectionKey="about">
              <About />
            </PageWrapper>
            <PageWrapper sectionKey="creative-engineering">
              <CreativeEngineeringApproach />
            </PageWrapper>
            <PageWrapper sectionKey="portfolio">
              <Portfolio />
            </PageWrapper>
            <PageWrapper sectionKey="horizontal-scroll">
              <HorizontalScroll />
            </PageWrapper>
            <PageWrapper sectionKey="process">
              <Process />
            </PageWrapper>
            <PageWrapper sectionKey="testimonials">
              <Testimonials />
            </PageWrapper>
            <PageWrapper sectionKey="contact">
              <Contact />
            </PageWrapper>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
