import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ExternalLink,
    Github,
    ArrowUpRight,
    Code,
    Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Projects data
    const projects = [
        {
            id: 1,
            title: 'Skin Disease Classification Using Machine Learning',
            description: 'AI-based image classification system that detects skin diseases using image processing and machine learning techniques.',
            fullDescription: 'Advanced deep learning model trained on dermatological images to identify and classify various skin conditions with high accuracy.',
            tech: ['Python', 'TensorFlow', 'OpenCV', 'CNN'],
            features: [
                'Image upload & preprocessing',
                'Real-time model prediction',
                'Accuracy metrics dashboard',
                'Dataset preprocessing pipeline'
            ],
            gradient: 'from-blue-500 via-cyan-500 to-teal-500',
            glowColor: 'rgba(34, 211, 238, 0.3)',
            github: '#',
            demo: '#',
            mockupBg: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20'
        },
        {
            id: 2,
            title: 'Global LMS Platform',
            description: 'Full-stack Learning Management System with teacher exam creation, real-time chat, and timed online examinations.',
            fullDescription: 'Comprehensive educational platform enabling seamless interaction between teachers and students with advanced exam management features.',
            tech: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT'],
            features: [
                'Exam timer with auto-submit',
                'Teacher/Student dashboards',
                'Real-time chat system',
                'Role-based authentication'
            ],
            gradient: 'from-purple-500 via-pink-500 to-rose-500',
            glowColor: 'rgba(168, 85, 247, 0.3)',
            github: '#',
            demo: '#',
            mockupBg: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20'
        },
        {
            id: 3,
            title: 'ROAS Analytics Pipeline',
            description: 'Data pipeline that analyzes Return on Ad Spend using Kaggle datasets, BigQuery, and DuckDB.',
            fullDescription: 'Scalable analytics infrastructure processing large-scale advertising data to derive actionable ROAS insights.',
            tech: ['Python', 'BigQuery', 'DuckDB', 'SQL', 'Pandas'],
            features: [
                'Automated data cleaning',
                'Optimized schema design',
                'Parquet conversion',
                'Advanced analytics queries'
            ],
            gradient: 'from-green-500 via-emerald-500 to-teal-500',
            glowColor: 'rgba(16, 185, 129, 0.3)',
            github: '#',
            demo: '#',
            mockupBg: 'bg-gradient-to-br from-green-900/20 to-emerald-900/20'
        }
    ];

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animated light beam
            gsap.to('.light-beam', {
                x: '100%',
                duration: 20,
                repeat: -1,
                ease: 'linear'
            });

            // Spotlight glow animation
            gsap.to('.spotlight-glow', {
                opacity: 0.6,
                scale: 1.2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Scroll-based parallax for background elements
            gsap.to('.parallax-bg', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: 150,
                opacity: 0.8
            });

            // Project cards scroll reveal
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'top 50%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)] py-20 md:py-32"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 overflow-hidden">

                {/* Dark cinematic gradient base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-black/40 to-[var(--bg-primary)]" />

                {/* Top spotlight fade */}
                <div className="spotlight-glow absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[var(--color-primary)] opacity-20 blur-[150px] rounded-full" />

                {/* Animated gradient overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%, rgba(34, 211, 238, 0.1) 100%)',
                    }}
                />

                {/* Moving soft light streak */}
                <div
                    className="light-beam absolute top-1/3 -left-full w-[200%] h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40 blur-sm"
                />

                {/* Depth shadow layers */}
                <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />

                {/* Floating blurred panels */}
                <motion.div
                    className="parallax-bg absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-5 blur-[120px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                <motion.div
                    className="parallax-bg absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--color-accent)] opacity-5 blur-[150px]"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                {/* Subtle gradient lines */}
                <div className="absolute inset-0 opacity-[0.03]">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent"
                            style={{
                                top: `${30 + i * 25}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                delay: i * 1.5,
                                ease: 'easeInOut'
                            }}
                        />
                    ))}
                </div>

                {/* Noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-20 md:mb-28"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-[var(--text-secondary)] text-sm font-medium">
                            <Code size={16} className="text-[var(--color-primary)]" />
                            <span>Featured Projects</span>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6"
                    >
                        Featured{' '}
                        <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            Work
                        </span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
                    >
                        A showcase of innovative solutions built with modern technologies
                    </motion.p>
                </motion.div>

                {/* Projects Grid - Large Vertical Stacked */}
                <div className="space-y-20 md:space-y-32">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>
            </div>

            {/* CSS Variables & Animations */}
            <style>{`
        :root {
          --bg-primary: #0b1120;
          --bg-secondary: #111827;
          --text-primary: #f9fafb;
          --text-secondary: #9ca3af;
          --color-primary: #6366f1;
          --color-primary-hover: #4f46e5;
          --color-accent: #22d3ee;
          --glass-bg: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        .light {
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --color-primary: #6366f1;
          --color-primary-hover: #4f46e5;
          --color-accent: #06b6d4;
          --glass-bg: rgba(255, 255, 255, 0.8);
          --glass-border: rgba(0, 0, 0, 0.1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          animation: gradient 6s ease infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        .parallax-bg {
          will-change: transform;
        }

        *:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
        </section>
    );
};

// Reusable Project Card Component
const ProjectCard = ({ project, index, isReversed }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

    // 3D tilt effect
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const angleX = (e.clientY - cardCenterY) / 40;
        const angleY = (e.clientX - cardCenterX) / 40;

        setRotateX(-angleX);
        setRotateY(angleY);

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`project-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1500px'
            }}
        >
            {/* Project Mockup/Preview */}
            <motion.div
                className={`relative ${isReversed ? 'lg:col-start-2' : ''}`}
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {/* Glow effect */}
                <motion.div
                    className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-3xl blur-3xl opacity-0 transition-opacity duration-500`}
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                    }}
                />

                {/* Mockup container */}
                <motion.div
                    className={`relative rounded-2xl lg:rounded-3xl ${project.mockupBg} backdrop-blur-xl border border-[var(--glass-border)] p-8 md:p-12 overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />

                    {/* Mockup placeholder - Browser window style */}
                    <div className="relative aspect-video rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] overflow-hidden shadow-2xl">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-primary)]/80 border-b border-[var(--glass-border)]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 ml-4 px-4 py-1 rounded-md bg-[var(--bg-secondary)]/50 text-xs text-[var(--text-secondary)]">
                                {project.title.toLowerCase().replace(/\s+/g, '-')}.com
                            </div>
                        </div>

                        {/* Content area with gradient */}
                        <div className={`relative h-full bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center`}>
                            <motion.div
                                className="text-6xl opacity-50"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            >
                                <Code size={80} className="text-white" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating elements decoration */}
                    <motion.div
                        className={`absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl`}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Project Info Panel */}
            <motion.div
                className={`space-y-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Project number */}
                <motion.div
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium"
                    whileHover={{ x: 5 }}
                >
                    <div className={`w-8 h-px bg-gradient-to-r ${project.gradient}`} />
                    <span>Project {String(index + 1).padStart(2, '0')}</span>
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                    {project.fullDescription}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                        <motion.div
                            key={i}
                            className="px-4 py-2 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-[var(--text-primary)] text-sm font-medium"
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                    {project.features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-3 text-[var(--text-secondary)]"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                            <span className="text-sm md:text-base">{feature}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                    <motion.a
                        href={project.demo}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-semibold shadow-lg transition-all`}
                        style={{
                            boxShadow: `0 10px 40px ${project.glowColor}`
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 15px 50px ${project.glowColor}`
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>View Project</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.a>

                    <motion.a
                        href={project.github}
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-[var(--text-primary)] font-semibold hover:border-[var(--color-primary)]/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github size={18} />
                        <span>Source Code</span>
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Projects;