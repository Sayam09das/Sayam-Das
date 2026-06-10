import React from 'react'
import Navbar from './components/Navbar'
import Hero from './Pages/Hero'
import Services from './Pages/Services'
import Projects from './Pages/Project'
import About from './Pages/About'
import Education from './Pages/Education'
import Skills from './Pages/Skills'
// import Testimonials from './Pages/Testimonials'
import Contact from './Pages/Contact'
import Footer from './components/Footer'

export default function page() {
  return (
<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white py-20">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
