import { Mail, Phone } from "lucide-react";
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export const personalInfo = {
  name: "Hemant Pandey",
  role: "Full Stack Web and App Developer",
  email: "hement.pandey2121@gmail.com",
  phone: "+91-6397565128",
  linkedin: "https://www.linkedin.com/in/hemant-pandey-ase/",
  github: "https://github.com/TheHemantPandey",
  twitter: "https://hemantpandey.in",
  instagram: "https://www.instagram.com/hemantt_pandey",
  about: "I am a passionate Computer Science student with a strong foundation in web development and programming. I enjoy building scalable applications and solving complex problems. My expertise lies in the MERN stack and other Technologies, and I am always eager to learn new technologies.",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hemant-pandey-ase/",
      icon: FaLinkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/TheHemantPandey",
      icon: FaGithub,
    },
    {
      name: "Email",
      url: "mailto:hement.pandey2121@gmail.com",
      icon: Mail,
    },
    {
      name: "Twitter",
      url: "https://hemantpandey.in",
      icon: FaTwitter,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/hemantt_pandey",
      icon: FaInstagram,
    },
    {
      name: "Phone",
      url: "tel:+916397565128",
      icon: Phone,
    },
  ],
};

export const skills = {
  languages: ["JavaScript", "Python", "Java", "SQL"],
  web: ["HTML", "Tailwind CSS", "React.js", "Node.js", "Express.js", "Vite"],
  tools: ["MongoDB", "MySQL", "Git", "GitHub", "Canva", "Figma"],
  softSkills: ["Problem-Solving", "Team Collaboration", "Project Management", "Adaptability"],
};

export const skillCategories = [
  { title: 'Languages', icon: 'Code', items: skills.languages },
  { title: 'Web Development', icon: 'Layout', items: skills.web },
  { title: 'Tools & Platforms', icon: 'Database', items: skills.tools },
  { title: 'Soft Skills', icon: 'Terminal', items: skills.softSkills },
];

export const certificates = [
  {
    name: "Cybersecurity Professional Training",
    issuer: "NIIT Foundation & Cisco Networking Academy",
    date: "Apr’26",
    image: "/unavailable",
    link: "/unavailable",
  },
  {
    name: "Full-Stack MERN Development Specialization",
    issuer: "Young India Show NGO Foundation",
    date: "Apr’26",
    image: "/unavailable",
    link: "/unavailable",
    featured: true,
  },
  {
    name: "12-Week Credit Course Certification",
    issuer: "Swayam NPTEL (University Credit Requirement)",
    date: "May’26",
    image: "/unavailable",
    link: "/unavailable",
  },
  {
    name: "Introduction to Internet of Things (IoT)",
    issuer: "NPTEL IIT Kharagpur",
    date: "Apr’25",
    image: "/unavailable",
    link: "/unavailable",
  },
  {
    name: "Object-Oriented Programming (OOPs)",
    issuer: "Neocolab",
    date: "Jan’25",
    image: "/unavailable",
    link: "/unavailable",
  },
  {
    name: "Data Structures and Algorithms (DSA)",
    issuer: "Neocolab",
    date: "Jan’25",
    image: "/unavailable",
    link: "/unavailable",
    featured: true,
  },
];

export const featuredCertificates = certificates.filter((certificate) => certificate.featured);

export const education = [
  {
    institution: "J.C. Bose University Of Science And Technology",
    degree: "B. Tech in Computer Science and Engineering",
    period: "Aug’23 – 26 through Lateral Entry",
    details: "CGPA: 8.1",
  },
  {
    institution: "Raja Jait Singh Government Polytechnic",
    degree: "Diploma in Electrical Engineering",
    period: "Apr’21 – Mar’23 through Lateral Entry",
    details: "CGPA: 7.6",
  },
  {
    institution: "Saraswati Vidya Mandir Inter College",
    degree: "Higher Secondary Schooling",
    period: "Apr’19 – Mar’21",
    details: "Percentage: 84%",
  },
];

export const highlights = [
  {
    metric: "10+",
    title: "Real World projects",
    description: "Built full-stack and realtime products across education, collaboration, entertainment, random video chat and more, showcasing a range of skills and technologies.",
  },
  {
    metric: "MERN",
    title: "Core stack focus",
    description: "Hands-on with React, Node.js, Express, MongoDB, plus realtime tooling like Socket.io and WebRTC. Passionate about building dynamic, interactive web applications.",
  },
  {
    metric: "06+",
    title: "Certifications earned",
    description: "Continuous learning across web development, data structures, object-oriented programming, Python, and IoT.",
  },
];