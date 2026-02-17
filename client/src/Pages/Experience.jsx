import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Briefcase,
    Code,
    Cpu,
    Database,
    GraduationCap,
    Calendar,
    ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Experience data
    const experiences = [
        {
            id: 1,
            title: 'Full Stack Developer – Global LMS Platform',
            type: 'Project / Internship',
            date: '2024',
            description: 'Built a complete Learning Management System with exam timer auto-submit, teacher dashboard, real-time chat, and secure authentication.',
            tech: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT', 'Socket.io'],
            icon: Code,
            gradient: 'from-blue-500 to-cyan-500',
            glowColor: 'rgba(34, 211, 238, 0.3)'
        },
        {
            id: 2,
            title: 'Machine Learning Developer – Skin Disease Classification',
            type: 'AI/ML Project',
            date: '2024',
            description: 'Developed an image processing system to classify skin diseases using CNN models and deep learning techniques.',
            tech: ['Python', 'TensorFlow', 'OpenCV', 'NumPy'],
            icon: Cpu,
            gradient: 'from-purple-500 to-pink-500',
            glowColor: 'rgba(168, 85, 247, 0.3)'
        },
        {
            id: 3,
            title: 'Data Analyst – ROAS Analytics Pipeline',
            type: 'Data Engineering Project',
            date: '2024',
            description: 'Designed data pipeline from Kaggle CSV to Parquet and analyzed marketing performance using BigQuery and DuckDB.',
            tech: ['Python', 'SQL', 'BigQuery', 'DuckDB', 'Pandas'],
            icon: Database,
            gradient: 'from-green-500 to-emerald-500',
            glowColor: 'rgba(16, 185, 129, 0.3)'
        },
        {
            id: 4,
            title: 'Computer Science Student & Intern',
            type: 'Academic + Internship',
            date: '2023 - Present',
            description: 'Worked on full-stack applications, presentations, and real-world projects focusing on scalable systems and AI solutions.',
            tech: ['Full Stack', 'AI/ML', 'Cloud Computing', 'System Design'],
            icon: GraduationCap,
            gradient: 'from-orange-500 to-red-500',
            glowColor: 'rgba(249, 115, 22, 0.3)'
        }
    ];

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {

            // Timeline path glow animation
            const timelineLine = timelineRef.current;
            if (timelineLine) {
                gsap.fromTo(timelineLine,
                    {
                        scaleY: 0,
                        transformOrigin: 'top center'
                    },
                    {
                        scaleY: 1,
                        duration: 2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: timelineLine,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Flowing gradient animation
                gsap.to('.timeline-gradient', {
                    backgroundPosition: '0% 200%',
                    duration: 8,
                    repeat: -1,
                    ease: 'linear'
                });
            }

            // Light sweep animation
            gsap.to('.light-sweep', {
                y: '100%',
                duration: 6,
                repeat: -1,
                ease: 'linear',
                stagger: 2
            });

            // Timeline dots reveal
            const dots = document.querySelectorAll('.timeline-dot');
            dots.forEach((dot, index) => {
                gsap.fromTo(dot,
                    {
                        scale: 0,
                        opacity: 0
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: dot,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Parallax blur shapes
            gsap.to('.blur-shape', {
                y: 100,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
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
            id="experience"
            className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)] py-20 md:py-32"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
        >
            {/* Professional Clean Background */}
            <div className="absolute inset-0 overflow-hidden">

                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

                {/* Soft radial spotlight */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--color-primary)] opacity-10 blur-[150px] rounded-full" />

                {/* Flowing gradient overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, var(--color-primary) 50%, transparent 100%)',
                    }}
                />

                {/* Light sweep animations */}
                <div className="light-sweep absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent blur-3xl" />
                <div className="light-sweep absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent blur-3xl" style={{ animationDelay: '2s' }} />

                {/* Subtle blur shapes */}
                <motion.div
                    className="blur-shape absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-5 blur-[120px]"
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
                    className="blur-shape absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-5 blur-[140px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                {/* Depth shadows */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />

                {/* Noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">

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
                            <Briefcase size={16} className="text-[var(--color-primary)]" />
                            <span>Professional Experience</span>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6"
                    >
                        My{' '}
                        <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                            Journey
                        </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
                    >
                        Building innovative solutions and growing through real-world challenges
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">

                    {/* Vertical Timeline Line */}
                    <div
                        ref={timelineRef}
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-ml-px overflow-hidden"
                    >
                        {/* Glowing gradient line */}
                        <div
                            className="timeline-gradient absolute inset-0 w-full h-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] opacity-60"
                            style={{
                                backgroundSize: '100% 200%',
                                backgroundPosition: '0% 0%'
                            }}
                        />

                        {/* Outer glow */}
                        <div className="absolute inset-0 w-2 -ml-0.5 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] opacity-30 blur-sm" />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-20">
                        {experiences.map((experience, index) => (
                            <TimelineItem
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>

                    {/* Timeline End Marker */}
                    <motion.div
                        className="flex justify-center mt-12"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    >
                        <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                            <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] blur-md animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CSS Variables */}
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

        html {
          scroll-behavior: smooth;
        }

        .blur-shape {
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

// Reusable Timeline Item Component
const TimelineItem = ({ experience, index, isLeft }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: "-100px" });

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
            y: 30
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: index * 0.2
            }
        }
    };

    return (
        <motion.div
            ref={itemRef}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`relative flex items-center ${isLeft
                    ? 'md:justify-end md:pr-12 lg:pr-16'
                    : 'md:justify-start md:pl-12 lg:pl-16'
                } pl-12 md:pl-0`}
        >
            {/* Timeline Dot */}
            <div className={`timeline-dot absolute left-0 md:left-1/2 top-8 ${isLeft ? 'md:-ml-3' : 'md:-ml-3'} z-10`}>
                <div className="relative">
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${experience.gradient} opacity-40 blur-md animate-pulse`} />

                    {/* Main dot */}
                    <div className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${experience.gradient} border-4 border-[var(--bg-primary)] shadow-lg flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            {/* Experience Card */}
            <motion.div
                className="w-full md:w-[calc(50%-3rem)] group"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                {/* Glow effect */}
                <div
                    className={`absolute -inset-1 bg-gradient-to-r ${experience.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    style={{
                        boxShadow: `0 0 60px ${experience.glowColor}`
                    }}
                />

                {/* Card */}
                <div className="relative rounded-2xl bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] p-6 md:p-8 overflow-hidden">

                    {/* Background gradient accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${experience.gradient} opacity-10 blur-3xl rounded-full`} />

                    {/* Icon */}
                    <div className="relative flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${experience.gradient}`}>
                            <experience.icon size={24} className="text-white" />
                        </div>

                        {/* Date badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-medium">
                            <Calendar size={14} />
                            <span>{experience.date}</span>
                        </div>
                    </div>

                    {/* Type label */}
                    <div className="mb-3">
                        <span className={`text-xs font-semibold bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent uppercase tracking-wider`}>
                            {experience.type}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
                        {experience.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-4">
                        {experience.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {experience.tech.map((tech, i) => (
                            <motion.span
                                key={i}
                                className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs font-medium border border-[var(--glass-border)] hover:border-[var(--color-primary)]/50 transition-colors"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Decorative corner */}
                    <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${experience.gradient} opacity-10 rounded-br-2xl`} />

                    {/* Hover arrow indicator */}
                    <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                    >
                        <ArrowRight size={20} className={`bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`} />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Experience;