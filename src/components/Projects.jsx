import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { getProjects } from '../lib/notion';
import { translateContent } from '../lib/translateContent';
import { useLanguage, useT } from '../context/LanguageContext';

function FeaturedProject({ project, index, onGalleryClick }) {
    const isEven = index % 2 === 0;
    const liveHref = project.liveLink || project.githubLink || '#';

    return (
        <motion.li
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative mb-24 list-none"
        >
            <div className="relative grid grid-cols-12 items-center gap-y-6">
                {/* Screenshot */}
                <div className={`col-span-12 md:col-span-7 md:row-start-1 ${isEven ? 'md:col-start-1' : 'md:col-start-6'}`}>
                    <a href={liveHref} target="_blank" rel="noopener noreferrer" className="group block relative rounded overflow-hidden">
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover rounded transition-all duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-mint-base/20 group-hover:bg-transparent transition-all duration-500" />
                    </a>
                </div>

                {/* Info — overlaps image on desktop */}
                <div className={`col-span-12 md:col-span-6 md:row-start-1 relative z-10 ${isEven ? 'md:col-start-7 md:text-right' : 'md:col-start-1 md:text-left'}`}>
                    <p className="text-mint-base font-mono text-xs mb-2 tracking-widest uppercase">Featured Project</p>
                    <h3 className="text-slate-light text-2xl font-bold font-sans mb-4">
                        <a href={liveHref} target="_blank" rel="noopener noreferrer" className="hover:text-mint-base transition-colors duration-300">
                            {project.title}
                        </a>
                    </h3>
                    <div className="bg-navy-light rounded shadow-xl p-5 mb-4 relative z-20">
                        <p className="text-slate-base text-sm leading-relaxed line-clamp-4">{project.description}</p>
                    </div>
                    <ul className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slate-dark mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {project.tech && project.tech.map((tag, i) => <li key={i}>{tag}</li>)}
                    </ul>
                    <div className={`flex items-center gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-slate-base hover:text-mint-base transition-colors" aria-label="Live Link">
                                <ExternalLink size={20} />
                            </a>
                        )}
                        {!project.liveLink && project.images.length > 1 && (
                            <button onClick={() => onGalleryClick(project)} className="text-slate-base hover:text-mint-base transition-colors" aria-label="View gallery">
                                <ImageIcon size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.li>
    );
}

function ProjectCard({ project, idx, onGalleryClick }) {
    const hasGallery = !project.liveLink && project.images && project.images.length > 0;
    const linkHref = project.liveLink || project.githubLink || '#';

    return (
        <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative transition-transform duration-300 ease-smooth hover:-translate-y-2 h-[350px]"
        >
            <div
                onClick={() => hasGallery && onGalleryClick(project)}
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
                            {hasGallery && (
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
                            onClick={(e) => hasGallery && e.preventDefault()}
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
}

export default function Projects() {
    const lang = useLanguage();
    const t = useT();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            const translated = await translateContent(data, lang);
            setProjects(translated);
            setLoading(false);
        };
        fetchProjects();
    }, [lang]);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    // Projects with images → featured spotlight. Projects without → cards.
    const featuredProjects = projects.filter(p => p.images && p.images.length > 0);
    const cardProjects = projects.filter(p => !p.images || p.images.length === 0);
    const showFeatured = featuredProjects.length > 0;
    const allCardProjects = showFeatured ? cardProjects : projects;

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
                    <h2 className="section-heading">{t('projects.heading')}</h2>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px] text-mint-base">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-slate-base my-20 font-mono">
                        {t('projects.empty')}
                    </div>
                ) : (
                    <>
                        {/* Featured projects — full-width spotlight */}
                        {showFeatured && (
                            <ul className="list-none p-0 mb-4">
                                {featuredProjects.map((project, idx) => (
                                    <FeaturedProject
                                        key={project.id || project.title}
                                        project={project}
                                        index={idx}
                                        onGalleryClick={setSelectedProject}
                                    />
                                ))}
                            </ul>
                        )}

                        {/* "Other Projects" heading when both sections coexist */}
                        {showFeatured && allCardProjects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-center mb-10"
                            >
                                <h3 className="text-slate-light font-sans text-2xl font-bold mb-1">Other Noteworthy Projects</h3>
                            </motion.div>
                        )}

                        {/* Cards grid */}
                        {allCardProjects.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                                {allCardProjects.map((project, idx) => (
                                    <ProjectCard
                                        key={project.id || project.title}
                                        project={project}
                                        idx={idx}
                                        onGalleryClick={setSelectedProject}
                                    />
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-navy-base/90 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-navy-light rounded-xl shadow-2xl overflow-hidden flex flex-col border border-navy-dark"
                        >
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
                                            <Github size={14} /> {t('projects.source_code')}
                                        </a>
                                    )}
                                </div>
                                <div className="text-slate-base font-sans text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                                    {selectedProject.description}
                                </div>
                                {selectedProject.images && selectedProject.images.length > 0 && (
                                    <div className="flex flex-col gap-6">
                                        <h4 className="text-mint-base font-mono text-sm tracking-widest uppercase">{t('projects.gallery')}</h4>
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
