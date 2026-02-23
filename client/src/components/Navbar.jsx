import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()

  useEffect(() => {
    let timeoutId = null
    const onScroll = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        setScrolled(window.scrollY > 24)
      }, 50)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (event, href) => {
    if (!href?.startsWith('#')) return
    event.preventDefault()

    const target = document.querySelector(href)
    if (!target) {
      setIsOpen(false)
      return
    }

    const lenis = window.__lenisInstance
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: -72, duration: 1.05 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[120]"
    >
      <nav
        className={`pointer-events-auto mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 transition-all duration-300 md:px-10 lg:px-[60px] ${
          scrolled ? 'h-16 bg-[#F5F6ED]/85 backdrop-blur-xl dark:bg-[#0F0F0F]/80' : 'h-20 bg-transparent'
        }`}
      >
        <a href="#home" className="cursor-pointer text-lg font-black tracking-[-0.02em] text-zinc-900 dark:text-white sm:text-xl">
          SAYAM DAS
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <motion.a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="group relative inline-block cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-[#444444] dark:text-[#BBBBBB]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#B8E93A] dark:bg-[#C6F54D]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3, rotate: 8, scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="cursor-pointer rounded-full border border-[#E2E8C0] bg-[#EEF2D3] p-2 text-[#111111] dark:border-[#2A2A2A] dark:bg-transparent dark:text-[#BBBBBB]"
              >
                <Icon size={16} />
              </motion.a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer rounded-lg border border-[#E2E8C0] bg-[#EEF2D3] p-2 text-[#111111] transition-colors duration-300 hover:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-transparent dark:text-white dark:hover:border-[#C6F54D]"
            aria-label="Toggle dark mode"
          >
            {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer rounded-lg border border-[#E2E8C0] bg-[#EEF2D3] p-2 text-[#111111] transition-colors duration-300 hover:border-[#B8E93A] dark:border-[#2A2A2A] dark:bg-transparent dark:text-white dark:hover:border-[#C6F54D] lg:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto mx-4 rounded-2xl border border-[#E2E8C0] bg-[#F5F6ED]/95 p-5 shadow-xl backdrop-blur transition-colors duration-300 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]/95 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="cursor-pointer text-sm font-semibold uppercase tracking-[0.14em] text-zinc-800 dark:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ rotate: 8, scale: 1.05 }}
                    className="cursor-pointer rounded-full border border-zinc-900/20 p-2 text-zinc-900 dark:border-[#2A2A2A] dark:text-white"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
