import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../projectsData';
import { trackProjectLiveDemoClick, trackProjectClick } from '../utils/analytics';

// Helper function to check if a link is internal (starts with /)
const isInternalLink = (url) => url && url.startsWith('/');

// Helper to strip emoji characters from strings for clean meta tags
const stripEmoji = (str) => str.replace(/\p{Extended_Pictographic}/gu, '').trim();

// Reusable link component that handles both internal and external links
const ProjectLink = ({ url, children, className, ...props }) => {
    if (!url) return null;
    
    if (isInternalLink(url)) {
        return (
            <Link to={url} className={className} {...props}>
                {children}
            </Link>
        );
    }
    
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className} {...props}>
            {children}
        </a>
    );
};

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);
    const currentIndex = projects.findIndex((p) => p.id === id);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center cursor-none">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project Details not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const pageDescription = project.detailDescription 
      ? (project.detailDescription.length > 155 ? project.detailDescription.slice(0, 152).trim() + '...' : project.detailDescription)
      : project.description;

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10 cursor-none">
            <Helmet>
                {/* Clean title — strip emoji for SERP readability */}
                <title>{`${stripEmoji(project.title)} — Project Details | Hemant Pandey`}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={`https://hemantpandey.in/project/${project.id}`} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://hemantpandey.in/project/${project.id}`} />
                <meta property="og:site_name" content="Hemant Pandey" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:title" content={`${stripEmoji(project.title)} — Project Details | Hemant Pandey`} />
                <meta property="og:description" content={project.description} />
                <meta property="og:image" content={`https://hemantpandey.in${project.image}`} />
                <meta property="og:image:alt" content={`${stripEmoji(project.title)} — project preview by Hemant Pandey`} />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${stripEmoji(project.title)} — Project Details | Hemant Pandey`} />
                <meta name="twitter:description" content={project.description} />
                <meta name="twitter:image" content={`https://hemantpandey.in${project.image}`} />
                <meta name="twitter:image:alt" content={`${stripEmoji(project.title)} — project preview by Hemant Pandey`} />

                {/* Structured Data JSON-LD */}
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                      {
                        "@type": "BreadcrumbList",
                        "@id": `https://hemantpandey.in/project/${project.id}#breadcrumb`,
                        "itemListElement": [
                          {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://hemantpandey.in/"
                          },
                          {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Projects",
                            "item": "https://hemantpandey.in/#projects"
                          },
                          {
                            "@type": "ListItem",
                            "position": 3,
                            "name": stripEmoji(project.title),
                            "item": `https://hemantpandey.in/project/${project.id}`
                          }
                        ]
                      },
                      {
                        "@type": "CreativeWork",
                        "@id": `https://hemantpandey.in/project/${project.id}#project`,
                        "name": stripEmoji(project.title),
                        "description": project.detailDescription || project.description,
                        "url": project.liveUrl || `https://hemantpandey.in/project/${project.id}`,
                        "image": `https://hemantpandey.in${project.image}`,
                        "author": {
                          "@type": "Person",
                          "@id": "https://hemantpandey.in/#person",
                          "name": "Hemant Pandey"
                        },
                        "creator": {
                          "@type": "Person",
                          "@id": "https://hemantpandey.in/#person"
                        },
                        "keywords": project.techStack.join(', ')
                      }
                    ]
                  })}
                </script>
            </Helmet>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 md:pb-24 pt-6 md:pt-18">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-12 cursor-none group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Selected Works
                </Link>

                <div className="space-y-16">
                    {/* Header: Title & Meta */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border-b border-[var(--border)] pb-16">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-[var(--text-muted)] mb-4">
                                <span>{project.id}</span>
                                <span>•</span>
                                <span>{project.category}</span>
                                <span>•</span>
                                <Link to="/profile" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline decoration-dotted underline-offset-4">
                                    By Hemant Pandey
                                </Link>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                                {project.title}
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                                {project.description}
                            </p>

                             <div className="flex gap-4">
                                
                                <ProjectLink 
                                    url={project.liveUrl} 
                                    data-cursor="LIVE"
                                    onClick={() => trackProjectLiveDemoClick(project.id, project.title)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-bg)] text-[var(--accent-text)] rounded-full hover:opacity-90 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                                >
                                    View Live <ExternalLink size={18} />
                                </ProjectLink>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-video w-full max-w-full rounded-2xl overflow-hidden border border-[var(--border)]"
                        >
                            <img
                                src={project.image}
                                alt={`${stripEmoji(project.title)} project preview`}
                                loading="lazy"
                                className="block w-full h-full max-w-full object-fill"
                            />
                        </motion.div>
                    </div>

                    {/* About section */}
                    {project.detailDescription && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-display font-bold mb-6">About This Project</h2>
                            <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                                {project.detailDescription}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[var(--border)] pt-16">
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-display font-bold mb-8">Key Features</h2>
                            <ul className="space-y-6">
                                {project.points.map((point, index) => (
                                    <li key={index} className="flex gap-4 text-[var(--text-secondary)] font-light leading-relaxed">
                                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-display font-bold mb-8">Technologies</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-primary)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Project Navigation Footer & Interlinking */}
                    <div className="border-t border-[var(--border)] pt-12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                        {prevProject && (
                            <Link
                                to={`/project/${prevProject.id}`}
                                onClick={() => trackProjectClick(prevProject.id, prevProject.title, prevProject.category)}
                                className="group inline-flex items-center gap-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-none"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <div className="text-left">
                                    <span className="block text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)]">Previous Project</span>
                                    <span className="font-display font-semibold text-xs sm:text-sm">{stripEmoji(prevProject.title)}</span>
                                </div>
                            </Link>
                        )}

                        <div className="flex items-center gap-3">
                            <Link
                                to="/profile"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all cursor-none"
                            >
                                About Developer
                            </Link>
                            <Link
                                to="/#projects"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all cursor-none"
                            >
                                All Works
                            </Link>
                        </div>

                        {nextProject && (
                            <Link
                                to={`/project/${nextProject.id}`}
                                onClick={() => trackProjectClick(nextProject.id, nextProject.title, nextProject.category)}
                                className="group inline-flex items-center gap-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-none text-right"
                            >
                                <div>
                                    <span className="block text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)]">Next Project</span>
                                    <span className="font-display font-semibold text-xs sm:text-sm">{stripEmoji(nextProject.title)}</span>
                                </div>
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
