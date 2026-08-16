import {
  personalInfo,
  skills,
  certificates,
  education,
  highlights
} from '../personalData.js';
import { projects } from '../projectsData.js';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i',
  'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'that', 'the', 'to', 'we',
  'what', 'when', 'where', 'which', 'who', 'why', 'you', 'your'
]);

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

const tokenize = (value) => {
  return normalize(value)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token && !STOP_WORDS.has(token));
};

const stringList = (items) => items.filter(Boolean).join(', ');

const profileSection = {
  id: 'profile',
  label: 'Profile',
  text: [
    `Name: ${personalInfo.name}`,
    `Role: ${personalInfo.role}`,
    `About: ${personalInfo.about}`
  ].join('\n'),
  keywords: [personalInfo.name, personalInfo.role, personalInfo.about, 'about', 'profile']
};

const contactSection = {
  id: 'contact',
  label: 'Contact',
  text: [
    `Email: ${personalInfo.email}`,
    `Phone: ${personalInfo.phone}`,
    `LinkedIn: ${personalInfo.linkedin}`,
    `GitHub: ${personalInfo.github}`,
    `Twitter: ${personalInfo.twitter}`,
    `Instagram: ${personalInfo.instagram}`
  ].join('\n'),
  keywords: [
    'contact', 'email', 'phone', 'linkedin', 'github', 'twitter', 'instagram',
    personalInfo.email, personalInfo.phone
  ]
};

const skillsSection = {
  id: 'skills',
  label: 'Skills',
  text: [
    `Languages: ${stringList(skills.languages)}`,
    `Web: ${stringList(skills.web)}`,
    `Tools: ${stringList(skills.tools)}`,
    `Soft skills: ${stringList(skills.softSkills)}`
  ].join('\n'),
  keywords: [
    'skills', 'tech', 'technology',
    ...skills.languages,
    ...skills.web,
    ...skills.tools,
    ...skills.softSkills
  ]
};

const highlightsSection = {
  id: 'highlights',
  label: 'Highlights',
  text: highlights
    .map((item) => `${item.metric} ${item.title}: ${item.description}`)
    .join('\n'),
  keywords: ['highlights', 'achievements', 'experience', ...highlights.map((item) => item.title)]
};

const educationSection = {
  id: 'education',
  label: 'Education',
  text: education
    .map((item) => `${item.degree} at ${item.institution} (${item.period})`)
    .join('\n'),
  keywords: ['education', 'degree', 'college', 'university', ...education.map((item) => item.degree)]
};

const certificateSection = {
  id: 'certificates',
  label: 'Certificates',
  text: certificates
    .map((item) => `${item.name} by ${item.issuer} (${item.date})`)
    .join('\n'),
  keywords: ['certificate', 'certification', ...certificates.map((item) => item.name)]
};

const projectSections = projects.map((project) => ({
  id: `project-${project.id}`,
  label: `Project: ${project.title}`,
  text: [
    `Title: ${project.title}`,
    `Subtitle: ${project.subtitle}`,
    `Period: ${project.period}`,
    `Category: ${project.category}`,
    `Description: ${project.description}`,
    `Details: ${project.detailDescription}`,
    `Tech stack: ${stringList(project.techStack)}`,
    `Live URL: ${project.liveUrl}`,
    `Key points: ${project.points.join(' ')}`
  ].join('\n'),
  keywords: [
    'project',
    project.title,
    project.subtitle,
    project.description,
    project.detailDescription,
    ...project.techStack,
    ...project.points
  ]
}));

const knowledgeSections = [
  profileSection,
  contactSection,
  skillsSection,
  highlightsSection,
  educationSection,
  certificateSection,
  ...projectSections
].map((section) => ({
  ...section,
  keywordTokens: tokenize(section.keywords.join(' '))
}));

const scoreSection = (section, queryTokens, rawQuery) => {
  let score = 0;

  for (const token of queryTokens) {
    const tokenMatches = section.keywordTokens.filter((keyword) => keyword === token).length;
    if (tokenMatches > 0) {
      score += tokenMatches * 3;
    }

    if (section.text.toLowerCase().includes(token)) {
      score += 1;
    }
  }

  if (rawQuery && section.text.toLowerCase().includes(rawQuery)) {
    score += 4;
  }

  return score;
};

export const getRelevantContext = (query, limit = 4) => {
  const rawQuery = normalize(query).trim();
  const queryTokens = tokenize(query);

  const scored = knowledgeSections
    .map((section) => ({
      ...section,
      score: scoreSection(section, queryTokens, rawQuery)
    }))
    .sort((a, b) => b.score - a.score);

  const primary = scored.filter((item) => item.score > 0).slice(0, limit);
  const selected = primary.length > 0 ? primary : scored.slice(0, Math.min(limit, scored.length));

  return selected.map((item) => ({
    id: item.id,
    label: item.label,
    text: item.text
  }));
};

export const buildContextText = (query, limit = 4) => {
  const sections = getRelevantContext(query, limit);
  return sections
    .map((section) => `[${section.label}]\n${section.text}`)
    .join('\n\n');
};

export const getPortfolioIdentity = () => ({
  name: personalInfo.name,
  role: personalInfo.role,
  email: personalInfo.email,
  location: 'India',
  availability: 'Available for work'
});
