//seen


import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../projectsData';

// Helper function to check if a link is internal (starts with /)
const isInternalLink = (url) => url && url.startsWith('/');

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

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10 cursor-none">
            <Helmet>
                <title>{`${project.title} | Project Details`}</title>
                <meta name="description" content={`Read details about ${project.title}, ${project.subtitle}. Tech Stack: ${project.techStack.join(', ')}.`} />
                <link rel="canonical" href={`https://hemantpandey.in/project/${project.id}`} />
                <meta property="og:title" content={`${project.title} | Project Details`} />
                <meta property="og:description" content={`Read details about ${project.title}, ${project.subtitle}. Tech Stack: ${project.techStack.join(', ')}.`} />
                <meta property="og:url" content={`https://hemantpandey.in/project/${project.id}`} />
                <meta property="og:image" content={project.image} />
                <meta name="twitter:title" content={`${project.title} | Project Details`} />
                <meta name="twitter:description" content={`Read details about ${project.title}, ${project.subtitle}. Tech Stack: ${project.techStack.join(', ')}.`} />
                <meta name="twitter:image" content={project.image} />

                {/* Structured Data JSON-LD */}
                <script type="application/ld+json">
                  {`
                    {
                      "@context": "https://schema.org",
                      "@graph": [
                        {
                          "@type": "BreadcrumbList",
                          "@id": "https://hemantpandey.in/project/${project.id}#breadcrumb",
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
                              "name": "${project.title}",
                              "item": "https://hemantpandey.in/project/${project.id}"
                            }
                          ]
                        },
                        {
                          "@type": "SoftwareApplication",
                          "@id": "https://hemantpandey.in/project/${project.id}#software",
                          "name": "${project.title}",
                          "applicationCategory": "DeveloperApplication",
                          "operatingSystem": "All",
                          "browserRequirements": "Requires HTML5 compatible browser",
                          "offers": {
                            "@type": "Offer",
                            "price": "0.00",
                            "priceCurrency": "USD"
                          }
                        }
                      ]
                    }
                  `}
                </script>
            </Helmet>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 md:pb-24 pt-6 md:pt-18">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
                        <div>
                            <span className="text-sm font-mono text-[var(--text-secondary)] mb-4 block">
                                {project.category} • {project.period}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="flex gap-4">
                                
                                <ProjectLink 
                                    url={project.liveUrl} 
                                    data-cursor="LIVE"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-bg)] text-[var(--accent-text)] rounded-full hover:opacity-90 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                                >
                                    View Live <ExternalLink size={18} />
                                </ProjectLink>
                                <ProjectLink 
                                    url={project.githubUrl} 
                                    data-cursor="CODE"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full hover:bg-[var(--surface-hover)] transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                                >
                                    Source Code <FaGithub size={18} />
                                </ProjectLink>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-video w-full max-w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="block w-full h-full max-w-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* detailDiscription */}
                    {project.detailDescription && (
                        <div className="mb-16">
                            <h3 className="text-2xl font-display font-bold mb-6">About This Project</h3>
                            <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                                {project.detailDescription}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[var(--border)] pt-16">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-display font-bold mb-8">Key Features</h3>
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
                            <h3 className="text-2xl font-display font-bold mb-8">Technologies</h3>
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
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;
