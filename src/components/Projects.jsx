import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { getProjects } from '../lib/notion';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
            setLoading(false);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    const handleProjectClick = (e, project) => {
        // Only intercept if there's no live link BUT there are images to show
        if (!project.liveLink && project.images && project.images.length > 0) {
            e.preventDefault();
            setSelectedProject(project);
        }
    };

    return (
        <section id="projects" className="py-24 relative max-w-[1000px] mx-auto min-h-[80vh]">
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

                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px] text-mint-base">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-slate-base my-20 font-mono">
                        No projects found.
                    </div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, idx) => {
                            const hasGallery = !project.liveLink && project.images && project.images.length > 0;
                            const linkHref = project.liveLink || project.githubLink || "#";

                            return (
                                <motion.li
                                    key={project.id || project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative transition-transform duration-300 ease-smooth hover:-translate-y-2 h-[350px]"
                                >
                                    <div
                                        onClick={(e) => hasGallery ? handleProjectClick(e, project) : undefined}
                                        className={`flex flex-col justify-between h-full py-8 px-7 rounded shadow-xl bg-navy-light hover:shadow-2xl hover:shadow-navy-dark/50 transition-all duration-300 group z-10 relative ${hasGallery ? 'cursor-pointer' : ''}`}
                                    >
                                        <header>
                                            <div className="flex justify-between items-center mb-8">
                                                <div className="text-mint-base">
                                                    <Folder size={40} className="stroke-1" />
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-light relative z-20">
                                                    {project.githubLink && (
                                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-mint-base transition-colors" aria-label="GitHub Link">
                                                            <Github size={20} />
                                                        </a>
                                                    )}
                                                    {project.liveLink && (
                                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-mint-base transition-colors" aria-label="External Link">
                                                            <ExternalLink size={20} />
                                                        </a>
                                                    )}
                                                    {hasGallery && !project.liveLink && (
                                                        <div className="text-mint-base/70 hidden group-hover:block animate-pulse" title="Click to view gallery">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="mb-2 text-xl font-bold font-sans text-slate-light group-hover:text-mint-base transition-colors duration-300">
                                                <a
                                                    href={linkHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => hasGallery ? handleProjectClick(e, project) : undefined}
                                                    className="before:content-[''] before:absolute before:inset-0 before:z-0"
                                                >
                                                    {project.title}
                                                </a>
                                            </h3>

                                            <p className="text-slate-base text-sm leading-relaxed mb-6 font-sans relative z-10 line-clamp-4">
                                                {project.description}
                                            </p>
                                        </header>

                                        <footer className="mt-auto">
                                            <ul className="flex flex-wrap items-end flex-grow gap-x-4 gap-y-2 list-none p-0 m-0 relative z-10">
                                                {project.tech && project.tech.map((tag, i) => (
                                                    <li key={i} className="font-mono text-[13px] text-slate-dark/70 tracking-wide whitespace-nowrap mr-2">
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </footer>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-navy-base/90 backdrop-blur-sm cursor-pointer"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-light rounded-xl shadow-2xl overflow-hidden flex flex-col border border-navy-dark"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-50 text-slate-base hover:text-mint-base transition-colors bg-navy-base/50 rounded-full p-2 backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            <div className="overflow-y-auto p-8 sm:p-10 custom-scrollbar">
                                <h3 className="text-3xl sm:text-4xl font-bold font-sans text-slate-light mb-4">
                                    {selectedProject.title}
                                </h3>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {selectedProject.tech && selectedProject.tech.map((tag, i) => (
                                        <span key={i} className="font-mono text-xs text-mint-base bg-mint-tint px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                    {selectedProject.githubLink && (
                                        <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs text-slate-base hover:text-mint-base transition-colors px-3 py-1 border border-slate-dark rounded-full">
                                            <Github size={14} /> Source Code
                                        </a>
                                    )}
                                </div>

                                <div className="text-slate-base font-sans text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                                    {selectedProject.description}
                                </div>

                                {selectedProject.images && selectedProject.images.length > 0 && (
                                    <div className="flex flex-col gap-6">
                                        <h4 className="text-mint-base font-mono text-sm tracking-widest uppercase">Gallery</h4>
                                        {selectedProject.images.map((imgUrl, i) => (
                                            <img
                                                key={i}
                                                src={imgUrl}
                                                alt={`${selectedProject.title} screenshot ${i + 1}`}
                                                className="w-full rounded border border-navy-dark shadow-lg object-cover"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
