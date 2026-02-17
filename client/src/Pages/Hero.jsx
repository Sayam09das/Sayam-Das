import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowDown, 
  Code2, 
  Sparkles,
  Terminal,
  Rocket,
  Star,
  Download,
  Play
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Enhanced 3D Sphere with dynamic colors
const AnimatedSphere = () => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 100]} 
        scale={hovered ? 2.8 : 2.5}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#a855f7" : "#6366f1"}
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

// Animated background particles
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: `radial-gradient(circle, ${
              ['#6366f1', '#a855f7', '#ec4899'][Math.floor(Math.random() * 3)]
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Skill badge component
const SkillBadge = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm text-slate-300 font-medium hover:bg-white/10 transition-all cursor-default"
  >
    {children}
  </motion.div>
)

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const skillsRef = useRef(null)
  const canvasRef = useRef(null)
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 30
      const y = (clientY / window.innerHeight - 0.5) * 30
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with stagger
      gsap.from(titleRef.current?.children || [], {
        opacity: 0,
        y: 120,
        rotationX: 90,
        transformOrigin: "bottom center",
        duration: 1.4,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3,
      })

      // Subtitle fade up
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      })

      // CTA buttons pop in
      gsap.from(ctaRef.current?.children || [], {
        opacity: 0,
        scale: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'back.out(2)',
        delay: 1.1,
      })

      // Skills fade in
      gsap.from(skillsRef.current?.children || [], {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 1.4,
      })

      // Canvas entrance
      gsap.from(canvasRef.current, {
        opacity: 0,
        scale: 0.3,
        rotate: -20,
        duration: 1.8,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const skills = ['React', 'Three.js', 'GSAP', 'Tailwind', 'Framer Motion']
  
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-purple-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-pink-400' },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
    >
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)] animate-grid-flow" />

      <motion.div 
        style={{ opacity: smoothOpacity, scale, y: smoothY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full backdrop-blur-lg"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-200">Open to opportunities</span>
            </motion.div>

            {/* Main Title */}
            <div ref={titleRef} className="space-y-2">
              <motion.h1 
                className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none"
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                }}
              >
                <div className="text-white perspective-text">
                  Creative
                </div>
                <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Developer
                </div>
                <div className="text-white/80 text-4xl sm:text-5xl lg:text-6xl mt-4 font-light">
                  & Designer
                </div>
              </motion.h1>

              {/* Animated tech icons */}
              <motion.div 
                className="flex items-center gap-4 pt-4"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Terminal className="w-7 h-7 text-indigo-400" />
                <Code2 className="w-7 h-7 text-purple-400" />
                <Rocket className="w-7 h-7 text-pink-400" />
                <Star className="w-7 h-7 text-yellow-400" />
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light"
              style={{
                transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
              }}
            >
              Crafting <span className="text-indigo-400 font-semibold">immersive digital experiences</span> with 
              cutting-edge technologies. Specializing in 
              <span className="text-purple-400 font-semibold"> 3D web development</span>, 
              <span className="text-pink-400 font-semibold"> interactive animations</span>, and 
              <span className="text-yellow-400 font-semibold"> modern UI/UX design</span>.
            </motion.p>

            {/* Skills */}
            <div ref={skillsRef} className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <SkillBadge key={skill} delay={1.4 + index * 0.08}>
                  {skill}
                </SkillBadge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99, 102, 241, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setCursorVariant("button")}
                onHoverEnd={() => setCursorVariant("default")}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden shadow-2xl shadow-indigo-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  View Projects
                  <Star className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-lg text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-lg text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </motion.button>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex gap-4 pt-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative group w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                >
                  <social.icon className="w-6 h-6 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right 3D Canvas */}
          <motion.div
            ref={canvasRef}
            className="relative h-[450px] sm:h-[550px] lg:h-[700px] hidden md:block"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            }}
          >
            {/* Glow effects */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} />
              <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
              <pointLight position={[10, -10, 5]} intensity={0.6} color="#ec4899" />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <AnimatedSphere />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
              />
            </Canvas>

            {/* Decorative rings */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity }
              }}
              className="absolute top-20 right-20 w-28 h-28 border-2 border-indigo-500/20 rounded-full"
            />
            
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.25, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute bottom-32 left-16 w-20 h-20 border-2 border-purple-500/20 rounded-full"
            />

            <motion.div
              animate={{ 
                rotate: 180,
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3.5, repeat: Infinity }
              }}
              className="absolute top-1/2 left-10 w-16 h-16 border-2 border-pink-500/20 rounded-full"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-sm font-medium text-slate-400 group-hover:text-indigo-400 transition-colors tracking-wider uppercase">
              Scroll to explore
            </span>
            <ArrowDown className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          </motion.div>
          
          {/* Scroll progress indicator */}
          <div className="w-[2px] h-16 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-indigo-400 to-purple-400"
              style={{ scaleY: scrollYProgress }}
              initial={{ transformOrigin: "top" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        .perspective-text {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}

export default Hero