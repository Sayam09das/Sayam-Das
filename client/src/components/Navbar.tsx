import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-[60px]">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="text-lg font-bold tracking-tight text-zinc-900"
        >
          Sayam Das
        </motion.a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <motion.a
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 transition-colors hover:text-zinc-950"
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-zinc-900/20 p-2 text-zinc-800 transition-colors hover:bg-zinc-900 hover:text-white"
                aria-label={social.label}
              >
                <Icon size={16} />
              </motion.a>
            )
          })}
        </div>
      </nav>
    </motion.header>
  )
}
