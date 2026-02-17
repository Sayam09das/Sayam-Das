import React from 'react'
import Hero from '../Pages/Hero'
import About from '../Pages/About'
import Skills from '../Pages/Skills'
import Projects from '../Pages/Projects'
import Experience from '../Pages/Experience'
function RoutesReturn() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience /> 
    </div>
  )
}

export { RoutesReturn }
