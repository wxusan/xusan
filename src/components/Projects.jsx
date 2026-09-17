import { ExternalLink } from 'lucide-react';
import { useT } from '../context/LanguageContext';
import { projects } from '../data-projects';

export default function Projects() {
    const t = useT();
    return <section id="projects" className="projects-section" aria-labelledby="projects-title">
        <h2 id="projects-title" className="section-heading">{t('projects.heading')}</h2>
        <p className="section-intro">{t('projects.intro')}</p>
        <ul className="featured-projects">
            {projects.map((project, index) => {
                const content = t(`projects.items.${project.id}`);
                return <li key={project.id} className={`featured-project ${index % 2 ? 'is-reversed' : ''}`}>
                    <a className="project-image-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${t('projects.visit')}`}>
                        <img src={project.image} alt={content.alt} width="1440" height="1000" loading="lazy" decoding="async" />
                    </a>
                    <div className="project-info">
                        <p className="project-eyebrow">{t('projects.featured')} / 0{index + 1}</p>
                        <h3><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a></h3>
                        <p className="project-category">{content.category}</p>
                        <div className="project-description"><p>{content.description}</p></div>
                        <ul className="project-tags">{content.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                        <a className="text-link project-visit" href={project.url} target="_blank" rel="noopener noreferrer">{t('projects.visit')}<ExternalLink size={15} aria-hidden="true" /></a>
                    </div>
                </li>;
            })}
        </ul>
    </section>;
}
