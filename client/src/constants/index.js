import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNode, FaPhp, FaJava, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiCplusplus, SiC, SiNextdotjs } from 'react-icons/si';

export const education = [
  {
    year: "2023 - 2027",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Lovely Professional University",
    description: "Currently pursuing B.Tech with focus on Full-Stack Development and Algorithms. Maintaining a solid academic record with 8.00 CGPA."
  },
  {
    year: "2021 - 2023",
    degree: "Intermediate (12th Grade)",
    institution: "Senior Secondary School",
    description: "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics (PCM)."
  },
  {
    year: "2019 - 2021",
    degree: "Matriculation (10th Grade)",
    institution: "Secondary School",
    description: "Completed secondary education with high performance in Mathematics and Science."
  }
];

export const certifications = [
  {
    title: "Java SpringBoot Training",
    issuer: "Programming Pathshala",
    date: "July 2025",
    link: "https://drive.google.com/file/d/1mNtuX4EAc4RMnDYsqPhhdYxkU_iF1NOy/view?usp=sharing",
    description: "Intensive training in Java, Spring Boot, and building scalable backends with high performance.",
    skills: ["Java", "Spring Boot", "Microservices", "REST API", "Database Design"]
  },
  {
    title: "Cloud Computing (NPTEL)",
    issuer: "IIT Kharagpur",
    date: "April 2025",
    link: "https://drive.google.com/file/d/1DC4bLeNUfKSTe-p7osZJ6QvisP7wEInq/view?usp=sharing",
    description: "Certified in Cloud architectures, virtualization, and distributed systems by NPTEL & IIT Kharagpur.",
    skills: ["Cloud Computing", "Virtualization", "AWS Basics", "Distributed Systems"]
  },
  {
    title: "Java Programming (72 Hours)",
    issuer: "Lovely Professional University",
    date: "May 2025",
    link: "https://drive.google.com/file/d/1jU1APs9lJGYMFMU7euPoDyldIIjquzCD/view?usp=sharing",
    description: "Comprehensive 72-hour assessment on Java programming, algorithms, and application development.",
    skills: ["Java", "OOPS", "Exception Handling", "Multithreading", "File I/O"]
  },
  {
    title: "Data Structures & Algorithms (72 Hours)",
    issuer: "Lovely Professional University",
    date: "Dec 2024",
    link: "https://drive.google.com/file/d/1Oa3enTMMpFzwhOc59ccRYs0oLJaEVPeN/view?usp=sharing",
    description: "In-depth specialization in DSA, covering optimization, pointers, and complex algorithmic techniques.",
    skills: ["DSA", "Pointers", "Recursion", "Optimizations", "Time Complexity"]
  },
  {
    title: "Volunteer - Community Plantation",
    issuer: "CURE (Urban Excellence)",
    date: "July 2024",
    link: "https://drive.google.com/file/d/13QE-8je8VzecjgHlsLnwbK-94Wf7pkmq/view?usp=sharing",
    description: "Active participation in 'Branching Out' community drive for urban plantation and sustainability.",
    skills: ["Teamwork", "Sustainability", "Community Leadership", "Impact Management"]
  },
  {
    title: "Full Stack Engineering Certification",
    issuer: "Industry Standard Authority",
    date: "2024-25",
    link: "https://drive.google.com/file/d/12-OKGSs3SieO5oKuq6IEwe1IDdNEzhmS/view?usp=drive_link",
    description: "Verified record of full-stack engineering proficiency and enterprise application logic.",
    skills: ["Full Stack", "System Design", "Enterprise Logic"]
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
  ],
  tools: [
    { name: "Git", icon: "FaGitAlt", color: "#F05032" },
    { name: "GitHub", icon: "FaGithub", color: "#ffffff" },
    { name: "VS Code", icon: "VscVscode", color: "#007ACC" },
    { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
    { name: "Docker", icon: "SiDocker", color: "#2496ED" },
    { name: "Vercel", icon: "SiVercel", color: "#000000" }
  ]
};

export const projects = [
  {
    id: "01",
    title: "Anarchy Bay",
    category: "Full Stack",
    description: "Architected a full-stack digital marketplace with 100+ listings. Features secure authentication, dynamic filtering, and optimized checkout, resulting in 30% faster load times.",
    features: [
      "Built a full-stack digital marketplace supporting 100+ active product listings",
      "Implemented secure JWT-based authentication with role-based access control",
      "Dynamic category filtering and real-time search for fast product discovery",
      "Optimized checkout pipeline reducing overall load time by 30%",
      "Integrated Supabase for real-time database sync and file storage"
    ],
    tech: ["React", "Express.js", "Supabase", "Tailwind CSS"],
    github_link: "https://github.com/Piyush5621/AnarchyBay",
    project_link: "https://anarchy-bay.vercel.app/",
    image_url: "/images/Anarchy-Bay.png"
  },
  {
    id: "02",
    title: "NexaMart",
    category: "Full Stack",
    description: "Developed a robust B2B/B2C marketing platform managing 200+ inventory records. Streamlined seller onboarding and admin approval workflows with real-time data visualization.",
    features: [
      "Designed a B2B/B2C marketing platform with 200+ managed inventory records",
      "Built seller onboarding flow with multi-step form validation and file uploads",
      "Admin dashboard with approval/rejection workflows and audit logs",
      "Real-time data visualization charts for sales and inventory analytics",
      "Responsive UI with mobile-first design using Tailwind CSS"
    ],
    tech: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    github_link: "https://github.com/Piyush5621/NexaMart.com/Piyush5621",
    project_link: "https://nexamartstore.wuaze.com/",
    image_url: "/images/NexaMart.png"
  },
  {
    id: "03",
    title: "IPC Simulator",
    category: "Web App",
    description: "A technical visualization of Inter-Process Communication mechanisms. Models pipe, message queue, and shared memory behavior across concurrent simulated processes.",
    features: [
      "Visual simulation of IPC mechanisms: Pipes, Message Queues, Shared Memory",
      "Concurrent process modeling with step-by-step execution trace",
      "Interactive UI to configure process count and IPC method",
      "Real-time state visualization showing memory blocks and message flow",
      "Built purely with vanilla JS, HTML, and CSS — no framework dependencies"
    ],
    tech: ["JavaScript", "HTML", "CSS", "OS Concepts"],
    github_link: "https://github.com/Piyush5621/IPC-DEBUGGERR",
    project_link: "https://piyush5621.github.io/IPC-DEBUGGERR/",
    image_url: "/images/IPC.png"
  }
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/piyushkumar5621/",
  github: "https://github.com/Piyush5621",
  email: "mailto:piyushkk0206@gmail.com",
  phone: "tel:+919798526058"
};

export const services = [];
