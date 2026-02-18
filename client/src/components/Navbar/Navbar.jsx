import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordRotate } from "../ui/word-rotate";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { Circle } from "lucide-react";

const sections = ["home", "about", "projects", "blogs"];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredSection, setHoveredSection] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActive(section);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const handleNavClick = (section) => {
        setActive(section);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-2 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[95%] md:w-auto">
                <nav
                    className={`
                        flex items-center justify-between
                        transition-all duration-300
                        border border-gray-200/80
                        bg-white/95 backdrop-blur-md
                        rounded-full
                        ${scrolled
                            ? "px-3 sm:px-4 md:px-6 py-2 shadow-lg"
                            : "px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-4"
                        }
                        ${mobileMenuOpen ? "rounded-3xl" : ""}
                    `}
                >
                    {/* Logo and Mobile Menu Container */}
                    <div className="flex items-center justify-between w-full md:w-auto relative">
                        {/* Logo */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEYb9H0sEj8UGOgVL9rlEZg6isF4rezzYKVA&s"
                                alt="Sayam Logo"
                                className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full object-cover"
                            />
                        </div>

                        {/* Available for work - Middle */}
                        <AnimatedShinyText className="md:hidden text-xs sm:text-sm font-medium text-green-500 whitespace-nowrap absolute left-1/2 -translate-x-1/2">
                            <Circle className="w-2 h-2 fill-green-500 mr-1.5" />
                            Available for work
                        </AnimatedShinyText>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="sm:w-6 sm:h-6"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="sm:w-6 sm:h-6"
                                >
                                    <line x1="4" x2="20" y1="12" y2="12" />
                                    <line x1="4" x2="20" y1="6" y2="6" />
                                    <line x1="4" x2="20" y1="18" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Navigation Links - Desktop & Tablet */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-6 lg:ml-8">
                        {sections.map((section) => (
                            <motion.div
                                key={section}
                                className="relative overflow-hidden cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setHoveredSection(section)}
                                onMouseLeave={() => setHoveredSection(null)}
                            >
                                <a
                                    href={`#${section}`}
                                    onClick={() => handleNavClick(section)}
                                    className={`
                                        capitalize text-sm font-medium transition-all duration-300 block
                                        ${active === section
                                            ? "text-[#5e67e5]"
                                            : "text-[#303030] hover:text-[#4c55d4]"
                                        }
                                    `}
                                >
                                    {hoveredSection === section ? (
                                        <WordRotate
                                            words={[section, section]}
                                            duration={500}
                                            className={`
                                                capitalize text-sm font-medium
                                                ${active === section
                                                    ? "text-[#5e67e5]"
                                                    : "text-[#4c55d4]"
                                                }
                                            `}
                                        />
                                    ) : (
                                        <span className={`
                                            capitalize text-sm font-medium
                                            ${active === section
                                                ? "text-[#5e67e5]"
                                                : "text-[#303030]"
                                            }
                                        `}>
                                            {section}
                                        </span>
                                    )}
                                </a>
                            </motion.div>
                        ))}

                        {/* Contact Button with Animation */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden ml-2"
                        >
                            <a
                                href="#contact"
                                className="contact-button"
                            >
                                <span className="diagonal-fill"></span>
                                <span className="contact-text">Contact</span>
                            </a>
                        </motion.div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-md"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => setHoveredSection(section)}
                                    onMouseLeave={() => setHoveredSection(null)}
                                >
                                    <a
                                        href={`#${section}`}
                                        onClick={() => handleNavClick(section)}
                                        className={`
                                            capitalize text-2xl sm:text-3xl font-semibold transition-all duration-300 block
                                            ${active === section
                                                ? "text-[#5e67e5]"
                                                : "text-[#303030] hover:text-[#4c55d4]"
                                            }
                                        `}
                                    >
                                        {hoveredSection === section ? (
                                            <WordRotate
                                                words={[section, section]}
                                                duration={500}
                                                className={`
                                                    capitalize text-2xl sm:text-3xl font-semibold
                                                    ${active === section
                                                        ? "text-[#5e67e5]"
                                                        : "text-[#4c55d4]"
                                                    }
                                                `}
                                            />
                                        ) : (
                                            <span className={`
                                                capitalize text-2xl sm:text-3xl font-semibold
                                                ${active === section
                                                    ? "text-[#5e67e5]"
                                                    : "text-[#303030]"
                                                }
                                            `}>
                                                {section}
                                            </span>
                                        )}
                                    </a>
                                </motion.div>
                            ))}

                            {/* Contact Button Mobile */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: sections.length * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-hidden mt-4"
                            >
                                <a
                                    href="#contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="contact-button text-base sm:text-lg px-6 py-3"
                                >
                                    <span className="diagonal-fill"></span>
                                    <span className="contact-text">Contact</span>
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}