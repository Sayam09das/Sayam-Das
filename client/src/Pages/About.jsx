import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Torus, Box, Sphere, MeshDistortMaterial, Float, Text3D, Center } from '@react-three/drei'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  User, 
  Code2, 
  Briefcase, 
  Award,
  Heart,
  Zap,
  Target,
  Coffee,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle2,
  Download,
  ArrowRight,
  Globe,
  Lightbulb,
  Layers,
  Cpu
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// 3D Floating Shapes
const FloatingShape = ({ position, shape = 'box', color = '#6366f1' }) => {
  const meshRef = useRef()
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  const ShapeComponent = {
    box: Box,
    torus: Torus,
    sphere: Sphere
  }[shape] || Box

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <ShapeComponent ref={meshRef} position={position} args={shape === 'torus' ? [0.5, 0.2, 16, 32] : [1, 1, 1]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </ShapeComponent>
    </Float>
  )
}

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef()
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return <span ref={nodeRef}>{count}{suffix}</span>
}

// Skill card component
const SkillCard = ({ icon: Icon, title, level, color, delay = 0 }) => {
  const cardRef = useRef()
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: `0 20px 40px ${color}40`,
        transition: { duration: 0.3 }
      }}
      className="group relative p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}15, transparent)`
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ 
              backgroundColor: `${color}20`,
              color: color
            }}
          >
            {level}%
          </motion.div>
        </div>

        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : {}}
            transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${color}, ${color}CC)`
            }}
          />
        </div>
      </div>

      {/* Corner decoration */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 opacity-20"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent)`
        }}
      />
    </motion.div>
  )
}

// Timeline item
const TimelineItem = ({ year, title, company, description, icon: Icon, side = 'left', delay = 0 }) => {
  const itemRef = useRef()
  const isInView = useInView(itemRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={`flex items-center gap-8 mb-12 ${side === 'right' ? 'flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <motion.div 
        className={`flex-1 ${side === 'right' ? 'text-right' : ''}`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold">
              {year}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-purple-400 font-semibold mb-3">{company}</p>
          <p className="text-slate-300 text-sm leading-relaxed">{description}</p>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>

      {/* Timeline dot */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
        className="relative flex-shrink-0"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative z-10 shadow-lg shadow-indigo-500/50">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-indigo-500/30"
        />
      </motion.div>

      {/* Spacer for other side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

// Stat card
const StatCard = ({ icon: Icon, value, label, suffix = '', color = '#6366f1', delay = 0 }) => {
  const cardRef = useRef()
  const isInView = useInView(cardRef, { once: true })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center group overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent)`
        }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </motion.div>

        <motion.div 
          className="text-4xl font-black mb-2"
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}AA)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          <AnimatedCounter end={value} suffix={suffix} />
        </motion.div>
        
        <p className="text-slate-300 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

const About = () => {
  const aboutRef = useRef(null)
  const canvasRef = useRef(null)
  const titleRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current?.children || [], {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
      })
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  const skills = [
    { icon: Code2, title: 'Frontend Development', level: 95, color: '#6366f1' },
    { icon: Cpu, title: 'React & Next.js', level: 92, color: '#8b5cf6' },
    { icon: Layers, title: '3D Web Graphics', level: 88, color: '#ec4899' },
    { icon: Zap, title: 'Performance Optimization', level: 90, color: '#f59e0b' },
    { icon: Globe, title: 'Responsive Design', level: 96, color: '#10b981' },
    { icon: Lightbulb, title: 'UI/UX Design', level: 85, color: '#06b6d4' },
  ]

  const timeline = [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Leading development of cutting-edge web applications with React, Three.js, and modern animation libraries.',
      icon: Briefcase,
      side: 'left'
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      company: 'Digital Solutions Co.',
      description: 'Developed responsive web applications and interactive user interfaces for major clients.',
      icon: Code2,
      side: 'right'
    },
    {
      year: '2020',
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      description: 'Designed beautiful and functional interfaces with focus on user experience and accessibility.',
      icon: Sparkles,
      side: 'left'
    },
    {
      year: '2018',
      title: 'Started Journey',
      company: 'Self-taught Developer',
      description: 'Began learning web development, focusing on HTML, CSS, JavaScript, and modern frameworks.',
      icon: Rocket,
      side: 'right'
    },
  ]

  const stats = [
    { icon: Briefcase, value: 150, suffix: '+', label: 'Projects Completed', color: '#6366f1' },
    { icon: Users, value: 50, suffix: '+', label: 'Happy Clients', color: '#8b5cf6' },
    { icon: Award, value: 12, suffix: '', label: 'Awards Won', color: '#ec4899' },
    { icon: Coffee, value: 500, suffix: '+', label: 'Cups of Coffee', color: '#f59e0b' },
  ]

  const values = [
    { icon: Target, title: 'Precision', description: 'Every pixel matters in creating perfect user experiences' },
    { icon: Zap, title: 'Performance', description: 'Building fast, efficient applications that scale' },
    { icon: Heart, title: 'Passion', description: 'Loving what I do and continuously improving' },
    { icon: TrendingUp, title: 'Growth', description: 'Always learning and adapting to new technologies' },
  ]

  return (
    <section
      ref={aboutRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <FloatingShape position={[-3, 2, -2]} shape="torus" color="#6366f1" />
          <FloatingShape position={[3, -1, -3]} shape="sphere" color="#a855f7" />
          <FloatingShape position={[0, 3, -4]} shape="box" color="#ec4899" />
          <FloatingShape position={[-2, -2, -2]} shape="sphere" color="#f59e0b" />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          ref={titleRef}
          style={{ opacity, scale }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-lg mb-6"
          >
            <User className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Get to know me</span>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white">
              About Me
            </h2>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              A passionate developer crafting exceptional digital experiences
            </p>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="relative p-8 lg:p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl" />
            
            <div className="relative z-10 space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Hi! I'm a <span className="text-indigo-400 font-semibold">creative developer</span> with a passion for building 
                beautiful, functional, and user-centered digital experiences. With over 
                <span className="text-purple-400 font-semibold"> 6 years of experience</span>, I've worked on everything from 
                small business websites to large-scale web applications.
              </p>
              <p>
                I specialize in <span className="text-pink-400 font-semibold">modern frontend technologies</span> including 
                React, Next.js, Three.js, and advanced animation libraries. I love combining technical excellence with 
                creative design to create experiences that not only look great but perform exceptionally.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full mt-4 hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
              >
                Download Resume
                <Download className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
          >
            Skills & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.title} {...skill} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-16"
          >
            My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </motion.h3>

          <div className="max-w-5xl mx-auto relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50 -translate-x-1/2" />

            {timeline.map((item, index) => (
              <TimelineItem key={item.year} {...item} delay={index * 0.2} />
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
          >
            Core <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Values</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
                  >
                    <Icon className="w-8 h-8 text-indigo-400" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-slate-300 text-sm">{value.description}</p>

                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl rounded-full"
            />
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full text-lg shadow-2xl shadow-indigo-500/50"
            >
              Let's Work Together
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}

export default About