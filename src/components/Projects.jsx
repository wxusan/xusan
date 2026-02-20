import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects = [
    {
        title: 'UyJoy',
        description: 'An interactive real estate platform for exploring and purchasing apartments. Features include building/floor navigation, polygon-based unit selection, multilingual support, an admin CRM for managing leads, and Cloudinary-optimized images.',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS', 'PostgreSQL'],
        github: 'https://github.com/wxusan/uy-joy',
        hasLive: false,
    },
    {
        title: 'Quran Quotes',
        description: 'A native iOS application designed for displaying and discovering meaningful quotes from the Quran. Built to be clean, distraction-free, and highly performant on Apple devices.',
        tags: ['Swift', 'SwiftUI', 'Xcode'],
        github: 'https://github.com/wxusan/QuranQuotes',
        hasLive: false,
    },
    {
        title: 'appleBox',
        description: 'A modern web application built with Next.js and TypeScript, focusing on high-performance server-side rendering and typed frontend geometry.',
        tags: ['TypeScript', 'Next.js', 'React'],
        github: 'https://github.com/wxusan/appleBox',
        hasLive: false,
    },
    {
        title: 'botbek',
        description: 'A JavaScript-based automation bot architecture designed for handling scheduled tasks and webhook integrations.',
        tags: ['JavaScript', 'Node.js', 'Bot API'],
        github: 'https://github.com/wxusan/botbek',
        hasLive: false,
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative max-w-[1000px] mx-auto min-h-screen">
            <div className="container mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12"
                >
                    <h2 className="section-heading">Some Things I've Built</h2>
                </motion.div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, idx) => (
                        <motion.li
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative transition-transform duration-300 ease-smooth hover:-translate-y-2"
                        >
                            <div className="flex flex-col justify-between h-full py-8 px-7 rounded shadow-xl bg-navy-light hover:shadow-2xl hover:shadow-navy-dark/50 transition-all duration-300 group z-10 relative">

                                {/* Header Icons */}
                                <header>
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="text-mint-base">
                                            <Folder size={40} className="stroke-1" />
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-light">
                                            {project.github !== '#' && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-mint-base transition-colors" aria-label="GitHub Link">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.hasLive && (
                                                <a href="#" className="hover:text-mint-base transition-colors" aria-label="External Link">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold font-sans text-slate-light group-hover:text-mint-base transition-colors duration-300">
                                        <a href={project.github !== '#' ? project.github : "#"} target="_blank" rel="noopener noreferrer" className="before:content-[''] before:absolute before:inset-0 before:z-0">
                                            {project.title}
                                        </a>
                                    </h3>

                                    <p className="text-slate-base text-sm leading-relaxed mb-6 font-sans relative z-10">
                                        {project.description}
                                    </p>
                                </header>

                                {/* Tags Bottom */}
                                <footer className="mt-auto">
                                    <ul className="flex flex-wrap items-end flex-grow gap-x-4 gap-y-2 list-none p-0 m-0 relative z-10">
                                        {project.tags.map((tag, i) => (
                                            <li key={i} className="font-mono text-xs text-slate-dark whitespace-nowrap">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </footer>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
