import React from 'react'
import Navbar from './components/Navbar'
import Hero from './Pages/Hero'
import Services from './Pages/Services'
import Projects from './Pages/Project'
import About from './Pages/About'
import Education from './Pages/Education'
import Skills from './Pages/Skills'
import Testimonials from './Pages/Testimonials'
import Contact from './Pages/Contact'
import Footer from './components/Footer'

export default function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Education />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
