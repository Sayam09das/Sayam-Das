import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/Skillssection'
import ProjectsSection from './components/Projectssection'
import ExperienceSection from './components/Experiencesection'
import { initSmoothScroll, initScrollTrigger } from './animations'

const App = () => {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const smooth = initSmoothScroll()
    const cleanupScrollTrigger = initScrollTrigger({ lenis: smooth.lenis })
    setLenis(smooth.lenis)

    return () => {
      cleanupScrollTrigger()
      smooth.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <div>
      <Navbar lenis={lenis} />
      <Hero lenis={lenis} />
      <AboutSection lenis={lenis} />
      <SkillsSection lenis={lenis} />
      <ProjectsSection lenis={lenis} />
      <ExperienceSection lenis={lenis} />
    </div>
  )
}

export default App
