import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNode, FaPhp, FaJava, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiCplusplus, SiC, SiNextdotjs } from 'react-icons/si';

export const experiences = [
  {
    year: "2023 - Present",
    role: "B.Tech Computer Science student",
    company: "Lovely Professional University",
    description: "Focusing on Full-Stack Engineering, Data Structures, and Scalable Systems. Currently maintaining a 8.00 CGPA while building high-impact web applications."
  },
  {
    year: "2025",
    role: "Java Spring Boot Training",
    company: "Programming Pathshala",
    description: "Advanced training in building RESTful APIs, implementing microservices architecture, and backend optimization with MySQL."
  }
];

export const skills = {
  frontend: [
    { name: "React", icon: "FaReact", color: "#61dbfb" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
    { name: "JavaScript", icon: "FaJs", color: "#f0db4f" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38b2ac" },
    { name: "HTML5", icon: "FaHtml5", color: "#e34c26" },
    { name: "CSS3", icon: "FaCss3Alt", color: "#264de4" }
  ],
  backend: [
    { name: "Node.js", icon: "FaNode", color: "#68a063" },
    { name: "Express.js", icon: "SiExpress", color: "#ffffff" },
    { name: "Java Spring Boot", icon: "FaJava", color: "#007396" },
    { name: "PHP", icon: "FaPhp", color: "#777bb4" },
    { name: "MySQL", icon: "SiMysql", color: "#4479a1" },
    { name: "Supabase", icon: "FaDatabase", color: "#3ecf8e" }
  ],
  programming: [
    { name: "Java", icon: "FaJava", color: "#007396" },
    { name: "C++", icon: "SiCplusplus", color: "#00599C" },
    { name: "Data Structures", icon: "FaCode", color: "#0055FF" },
    { name: "Algorithms", icon: "FaTerminal", color: "#ffffff" }
  ]
};

export const projects = [
  {
    id: "01",
    title: "Anarchy Bay",
    category: "Full Stack",
    description: "Architected a full-stack digital marketplace with 100+ listings. Features secure authentication, dynamic filtering, and optimized checkout, resulting in 30% faster load times.",
    tech: ["React", "Express.js", "Supabase", "Tailwind CSS"],
    github_link: "https://github.com/Piyush5621",
    project_link: "#",
    image_url: "/images/Anarchy-Bay.png"
  },
  {
    id: "02",
    title: "NexaMart",
    category: "Full Stack",
    description: "Developed a robust B2B/B2C marketing platform managing 200+ inventory records. Streamlined seller onboarding and admin approval workflows with real-time data visualization.",
    tech: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    github_link: "https://github.com/Piyush5621",
    project_link: "#",
    image_url: "/images/NexaMart.png"
  },
  {
    id: "03",
    title: "IPC Simulator",
    category: "Web App",
    description: "A technical visualization of Inter-Process Communication mechanisms. Models pipe, message queue, and shared memory behavior across concurrent simulated processes.",
    tech: ["JavaScript", "HTML", "CSS", "OS Concepts"],
    github_link: "https://github.com/Piyush5621",
    project_link: "#",
    image_url: "/images/IPC.png"
  }
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/piyushkumar5621/",
  github: "https://github.com/Piyush5621",
  email: "mailto:piyushkk0206@gmail.com",
  phone: "tel:+919798526058"
};

// Keeping services for compatibility if needed, but focusing on skills/projects as per prompt
export const services = [];
