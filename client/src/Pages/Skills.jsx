import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Torus, Sphere, MeshDistortMaterial, Float, Text3D, Center, Environment } from '@react-three/drei'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Code2, 
  Palette,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  Layers,
  Zap,
  Shield,
  GitBranch,
  Package,
  Terminal,
  Workflow,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Star,
  Rocket,
  Settings,
  Box,
  Binary
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// 3D Skill Sphere
const SkillSphere = ({ position, color = '#6366f1', speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.3) * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={speed}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

// Interactive skill card with 3D tilt effect
const SkillCard = ({ icon: Icon, title, skills, color, delay = 0, category }) => {
  const cardRef = useRef()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="group h-full"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative h-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Gradient background */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}30, transparent 70%)`
          }}
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background: `radial-gradient(circle, ${color}, transparent)`
          }}
        />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: `${color}20` }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `linear-gradient(45deg, ${color}40, transparent)`,
                  `linear-gradient(225deg, ${color}40, transparent)`,
                  `linear-gradient(45deg, ${color}40, transparent)`,
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Icon className="w-10 h-10 relative z-10" style={{ color }} />
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.2 }}
            className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold"
            style={{
              backgroundColor: `${color}20`,
              color: color
            }}
          >
            {category}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>

          {/* Skills list */}
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: delay + 0.3 + index * 0.1 }}
                className="flex items-center justify-between group/skill"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-slate-300 group-hover/skill:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>

                {/* Proficiency level */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: delay + 0.5 + i * 0.05 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: i < skill.level ? color : '#ffffff20'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${rotateY > 0 ? '100%' : '0%'} ${rotateX > 0 ? '100%' : '0%'}, ${color}20, transparent 60%)`
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Tool/Technology badge
const TechBadge = ({ icon: Icon, name, color, delay = 0 }) => {
  const badgeRef = useRef()
  const isInView = useInView(badgeRef, { once: true })

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.15, 
        rotate: 5,
        boxShadow: `0 10px 30px ${color}50`
      }}
      className="group relative px-6 py-3 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {Icon ? <Icon className="w-5 h-5" style={{ color }} /> : (
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          )}
        </motion.div>
        <span className="text-white font-semibold">{name}</span>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}10, transparent)`
        }}
      />
    </motion.div>
  )
}

// Certification card
const CertificationCard = ({ title, issuer, year, icon: Icon, color, delay = 0 }) => {
  const cardRef = useRef()
  const isInView = useInView(cardRef, { once: true })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
          </motion.div>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-semibold text-slate-300">
            {year}
          </span>
        </div>

        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-sm font-semibold" style={{ color }}>{issuer}</p>
      </div>

      {/* Verified badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: delay + 0.3, type: "spring" }}
        className="absolute bottom-4 right-4"
      >
        <CheckCircle2 className="w-6 h-6 text-green-400" />
      </motion.div>
    </motion.div>
  )
}

// Experience level indicator
const ExperienceBar = ({ label, years, color, delay = 0 }) => {
  const barRef = useRef()
  const isInView = useInView(barRef, { once: true })

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">{label}</span>
        <span className="text-slate-400 text-sm font-medium">{years} years</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(years / 10) * 100}%` } : {}}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}AA)`
          }}
        >
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const skillsRef = useRef(null)
  const titleRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 100,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      category: "Development",
      color: "#6366f1",
      skills: [
        { name: "React.js", level: 5 },
        { name: "Next.js", level: 5 },
        { name: "TypeScript", level: 4 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Framer Motion", level: 5 },
      ]
    },
    {
      icon: Database,
      title: "Backend & Database",
      category: "Development",
      color: "#8b5cf6",
      skills: [
        { name: "Node.js", level: 4 },
        { name: "Express.js", level: 4 },
        { name: "MongoDB", level: 4 },
        { name: "PostgreSQL", level: 3 },
        { name: "GraphQL", level: 3 },
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      category: "Design",
      color: "#ec4899",
      skills: [
        { name: "Figma", level: 5 },
        { name: "Adobe XD", level: 4 },
        { name: "Photoshop", level: 4 },
        { name: "Illustrator", level: 3 },
        { name: "Prototyping", level: 5 },
      ]
    },
    {
      icon: Box,
      title: "3D & Animation",
      category: "Creative",
      color: "#f59e0b",
      skills: [
        { name: "Three.js", level: 4 },
        { name: "React Three Fiber", level: 4 },
        { name: "GSAP", level: 5 },
        { name: "Blender", level: 3 },
        { name: "WebGL", level: 3 },
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      category: "Development",
      color: "#10b981",
      skills: [
        { name: "React Native", level: 4 },
        { name: "Flutter", level: 3 },
        { name: "iOS Development", level: 3 },
        { name: "Android Development", level: 3 },
        { name: "PWA", level: 5 },
      ]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      category: "Infrastructure",
      color: "#06b6d4",
      skills: [
        { name: "AWS", level: 4 },
        { name: "Docker", level: 4 },
        { name: "CI/CD", level: 4 },
        { name: "Vercel", level: 5 },
        { name: "Firebase", level: 4 },
      ]
    },
  ]

  const tools = [
    { icon: GitBranch, name: "Git", color: "#f05032" },
    { icon: Terminal, name: "VS Code", color: "#007acc" },
    { icon: Package, name: "npm", color: "#cb3837" },
    { icon: Workflow, name: "Webpack", color: "#8dd6f9" },
    { icon: Settings, name: "Vite", color: "#646cff" },
    { icon: Binary, name: "Babel", color: "#f9dc3e" },
  ]

  const certifications = [
    { title: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2024", icon: Award, color: "#ff9900" },
    { title: "React Expert Certification", issuer: "Meta", year: "2023", icon: Star, color: "#61dafb" },
    { title: "UI/UX Design Professional", issuer: "Google", year: "2023", icon: Palette, color: "#4285f4" },
    { title: "Advanced JavaScript", issuer: "freeCodeCamp", year: "2022", icon: Code2, color: "#0a0a23" },
  ]

  const experience = [
    { label: "Web Development", years: 6, color: "#6366f1" },
    { label: "UI/UX Design", years: 5, color: "#ec4899" },
    { label: "3D Graphics", years: 3, color: "#f59e0b" },
    { label: "Mobile Development", years: 4, color: "#10b981" },
  ]

  return (
    <section
      ref={skillsRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <SkillSphere position={[-4, 2, -3]} color="#6366f1" speed={0.8} />
          <SkillSphere position={[4, -2, -4]} color="#8b5cf6" speed={1.2} />
          <SkillSphere position={[0, 3, -5]} color="#ec4899" speed={1} />
          <SkillSphere position={[-3, -3, -3]} color="#f59e0b" speed={0.9} />
          <SkillSphere position={[3, 1, -2]} color="#10b981" speed={1.1} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-lg mb-6"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Technical Expertise</span>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white">
              Skills & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              Mastering the tools and technologies to build exceptional digital experiences
            </p>
          </div>
        </motion.div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} {...category} delay={index * 0.1} />
          ))}
        </div>

        {/* Tools & Technologies */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
          >
            Tools & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Workflow</span>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <TechBadge key={tool.name} {...tool} delay={index * 0.05} />
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
          >
            Years of <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Experience</span>
          </motion.h3>

          <div className="max-w-3xl mx-auto space-y-6">
            {experience.map((exp, index) => (
              <ExperienceBar key={exp.label} {...exp} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
          >
            Certifications & <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Awards</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.title} {...cert} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              >
                50+
              </motion.div>
              <p className="text-slate-300 font-medium">Technologies</p>
            </div>
            <div>
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              >
                6+
              </motion.div>
              <p className="text-slate-300 font-medium">Years Experience</p>
            </div>
            <div>
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              >
                100+
              </motion.div>
              <p className="text-slate-300 font-medium">Projects Built</p>
            </div>
            <div>
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              >
                12
              </motion.div>
              <p className="text-slate-300 font-medium">Certifications</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-slate-300 mb-6">
            Interested in working together?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold rounded-full text-lg shadow-2xl shadow-purple-500/50"
          >
            Let's Build Something Amazing
            <Rocket className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills