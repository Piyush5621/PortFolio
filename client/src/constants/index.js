import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNode, FaPhp, FaJava, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiCplusplus, SiC, SiNextdotjs } from 'react-icons/si';

export const experiences = [
    {
        year: "2023",
        role: "Java Spring Boot Training",
        company: "Online/Internship",
        description: "Intensive training on REST APIs, MVC architecture, and MySQL integration. Built robust backend services using Spring Boot."
    },
    {
        year: "Present",
        role: "B.Tech CSE Student",
        company: "Lovely Professional University",
        description: "Focusing on Full Stack Development, Data Structures, and Algorithms. Building scalable projects like NexaMart and FinSathi."
    }
];

export const skills = {
    frontend: [
        { name: "HTML5", icon: "FaHtml5", color: "#e34c26" },
        { name: "CSS3", icon: "FaCss3Alt", color: "#264de4" },
        { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38b2ac" },
        { name: "JavaScript", icon: "FaJs", color: "#f0db4f" },
        { name: "React.js", icon: "FaReact", color: "#61dbfb" },
        { name: "Next.js", icon: "SiNextdotjs", color: "#000000" }
    ],
    backend: [
        { name: "Node.js", icon: "FaNode", color: "#68a063" },
        { name: "PHP", icon: "FaPhp", color: "#777bb4" },
        { name: "MySQL", icon: "SiMysql", color: "#4479a1" },
        { name: "REST APIs", icon: "FaDatabase", color: "#00d0ff" }
    ],
    programming: [
        { name: "C", icon: "SiC", color: "#555555" },
        { name: "C++", icon: "SiCplusplus", color: "#00599C" },
        { name: "Java", icon: "FaJava", color: "#007396" },
        { name: "Python", icon: "FaPython", color: "#3776ab" }
    ]
};

export const projects = [
  {
    id: "anarchy-bay",
    title: "Anarchy Bay",
    description: "A full-stack e-commerce marketplace supporting 100+ product listings. Engineered secure authentication, payment workflows, and multi-level filtering, reducing cart abandonment by 25% and improving product discovery by 40%.",
    tech: ["React", "Express.js", "Supabase", "Tailwind CSS", "JavaScript"],
    github_link: "https://github.com/Piyush5621", 
    project_link: "#", // Add your live demo link here
    image_url: "/images/Anarchy-Bay.png" // Update with your actual image path
  },
  {
    id: "nexa-mart",
    title: "NexaMart",
    description: "A B2B & B2C marketing platform featuring interactive admin dashboards that manage 200+ inventory records. Implemented DOM-based image previews and client-side validation, reducing user errors by 40%.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "Tailwind CSS"],
    github_link: "https://github.com/Piyush5621",
    project_link: "#", // Add your live demo link here
    image_url: "/images/NexaMart.png" // Update with your actual image path
  },
  {
    id: "ipc-simulator",
    title: "IPC Simulator",
    description: "A GUI-based Operating System visualization tool demonstrating core inter-process communication mechanisms (pipes, message queues, shared memory). Simulated 5–10 concurrent processes to analyze synchronization, race conditions, and deadlocks.",
    tech: ["JavaScript", "HTML", "CSS", "OS Concepts"],
    github_link: "https://github.com/Piyush5621", // Update with specific repo link if available
    project_link: "#", 
    image_url: "/images/IPC.png" // Update with your actual image path
  }
];

export const socialLinks = {
    linkedin: "#",
    github: "#",
    email: "mailto:piyush@example.com", // Update with real email
    phone: "tel:+910000000000" // Update with real phone
};

// Keeping services for compatibility if needed, but focusing on skills/projects as per prompt
export const services = [];
