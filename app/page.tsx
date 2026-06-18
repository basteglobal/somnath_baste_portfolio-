'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import {
  Briefcase, Code, Mail, Download, MapPin, 
  CheckCircle, Building2, DraftingCompass, Server, 
  Database, Github, Linkedin, ExternalLink, ArrowRight,
  Menu, X, ChevronRight, Cpu, Layers, Target, Moon, Sun, Instagram
} from 'lucide-react';
import Image from 'next/image';

// --- DATA ---

const EXPERIENCES = [
  {
    id: 1,
    role: "BIM Modeler – Mechanical Building Services",
    company: "DAR Al-Handasah",
    duration: "2021 - Present",
    location: "Pune, India (Global Projects)",
    description: "Leading BIM modeling for complex mechanical building services. Coordinating with multidisciplinary teams across global megaprojects using Revit MEP and BIM 360.",
    highlights: [
      "NEOM Trojena Project, Saudi Arabia",
      "DIFC Dubai & Palm Jumeirah Projects",
      "Dammam Stadium, Saudi Arabia",
      "Ensured strict adherence to Saudi Aramco Standards"
    ]
  },
  {
    id: 2,
    role: "BIM Engineer",
    company: "Tata Consulting Engineers (TCE)",
    duration: "2018 - 2021",
    location: "India",
    description: "Specialized in Fire Protection & Plumbing Design. Developed precise 3D models and clash detection reports using Navisworks.",
    highlights: [
      "Ram Mandir, Ayodhya",
      "Central Vista Redevelopment, New Delhi",
      "Comprehensive clash resolution reducing on-site issues by 40%"
    ]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "NEOM Trojena",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/trojena.png",
    description: "Mechanical building services modeling for the futuristic mountain destination in Saudi Arabia."
  },
  {
    id: 2,
    title: "Ram Mandir, Ayodhya",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/ram.png",
    description: "Detailed 3D modeling and mechanical services coordination for the historic temple complex."
  },
  {
    id: 3,
    title: "New Parliament Building",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/parlament.png",
    description: "Strategic MEP BIM modeling for India's administrative epicenter redevelopment in New Delhi."
  },
  {
    id: 4,
    title: "DIFC Dubai",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/difc.png",
    description: "Comprehensive BIM coordination for high-end commercial spaces in the Dubai International Financial Centre."
  },
  {
    id: 5,
    title: "Dammam Stadium Aramco",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/stadiumdaamam.png",
    description: "Collaborative MEP modeling scaling massive infrastructure for Saudi Aramco."
  },
  {
    id: 6,
    title: "Al Jada Mall",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/aljadamall.png",
    description: "Complex mechanical services modeling and clash detection for a premier retail destination."
  },
  {
    id: 7,
    title: "Saadiyat Island",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/sadhiyat.png",
    description: "Expert MEP BIM modeling for exclusive, high-end residential and commercial developments."
  },
  {
    id: 8,
    title: "Trojena Lake",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/trojenalake.png",
    description: "Integrated infrastructure modeling for the monumental artificial lake project in NEOM."
  },
  {
    id: 9,
    title: "Yas Island",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/yas.png",
    description: "High-precision 3D coordination for world-class entertainment and leisure facilities."
  },
  {
    id: 10,
    title: "Palm Jumeirah Dubai",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/pjr.png",
    description: "Iconic artificial archipelago high-end residential MEP coordination."
  },
  {
    id: 11,
    title: "Global Skill Park Bhopal",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/gsp.png",
    description: "BIM services for a massive skill development center in Madhya Pradesh."
  },
  {
    id: 12,
    title: "MSME Patna",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/msme.png",
    description: "Micro, Small and Medium Enterprises facility mechanical modeling."
  },
  {
    id: 13,
    title: "Ashoka Nashik",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/ashokanashik.png",
    description: "Commercial and residential BIM project in Nashik."
  },
  {
    id: 14,
    title: "Bhagwati Steel",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/bhagwati.png",
    description: "Steel Factory project requiring heavy industrial MEP coordination."
  },
  {
    id: 15,
    title: "Guru Gobind Singh College Nashik",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/gurugnashik.png",
    description: "Mixed-use educational development BIM coordination."
  },
  {
    id: 16,
    title: "Enter Monde",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/entermonde.png",
    description: "MIDC project requiring precise 3D mechanical models."
  },
  {
    id: 17,
    title: "Wonder Cement",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/wonder.png",
    description: "Large-scale international Cement Company plant layout."
  },
  {
    id: 18,
    title: "FDC Project",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/fdc.png",
    description: "Pharmaceutical project in Aurangabad emphasizing sanitary plumbing and advanced HVAC."
  },
  {
    id: 19,
    title: "Ethiopian Electric Power",
    category: "International",
    image: "https://codewithbaste.github.io/somnath/eep.png",
    description: "Headquarters for the Ethiopian Electric Power Africa."
  },
  {
    id: 20,
    title: "ABB Project",
    category: "India",
    image: "https://codewithbaste.github.io/somnath/abb.png",
    description: "Industrial facility MEP modeling for ABB."
  }
];

const SKILLS = [
  { name: "Revit MEP", level: 98 },
  { name: "Navisworks", level: 95 },
  { name: "BIM 360 / Autodesk Construction Cloud", level: 90 },
  { name: "Fire Protection & Plumbing Design", level: 92 },
  { name: "Saudi Aramco Standards", level: 85 },
  { name: "AutoCAD & Draftsight", level: 95 },
  { name: "Software Development & Scripting", level: 75 },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "15+", label: "Global Megaprojects" },
  { value: "10+", label: "Tools and Software" },
  { value: "2+", label: "Business Ventures" }
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Claude with the Anthropic API",
    issuer: "Anthropic",
    date: "Issued Mar 2026",
    credentialId: "hpcifwtgwksd",
    skills: "Anthropic API, Claude",
    image: "https://picsum.photos/seed/anthropic/800/600"
  },
  {
    id: 2,
    title: "Navisworks Essential Training 2023",
    issuer: "LinkedIn",
    date: "Issued Jun 2025",
    credentialId: "",
    skills: "Navisworks",
    image: "https://picsum.photos/seed/navisworks/800/600"
  },
  {
    id: 3,
    title: "Dynamo 2.x Essential Training",
    issuer: "LinkedIn",
    date: "Issued May 2025",
    credentialId: "18226e8d40ecdd04bf42621c03af44afa225cdd06386e65c6049e136df6b74eb",
    skills: "Dynamo",
    image: "https://codewithbaste.github.io/somnath/dynamocertificate.png"
  },
  {
    id: 4,
    title: "Creating a BIM Execution Plan",
    issuer: "LinkedIn",
    date: "Issued May 2025",
    credentialId: "9ce7ad00a14312a60f6787d62f38a7a0e291e67b902f574e9bf6453440b7effb",
    skills: "Building Information Modeling (BIM)",
    image: "https://codewithbaste.github.io/somnath/bimcertificate.png"
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence (2023)",
    issuer: "LinkedIn",
    date: "Issued May 2025",
    credentialId: "94a0c675bbed8392cacde1c23c5e23e76cf6498943c7e4f2148e6e0705e0d3bc",
    skills: "Artificial Intelligence (AI)",
    image: "https://codewithbaste.github.io/somnath/alcertificate.png"
  }
];

// --- COMPONENTS ---

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Experience', 'Projects', 'Skills', 'Ventures', 'Certifications'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'top-4 px-4' : 'top-0 px-0'}`}>
      <div className={`mx-auto transition-all duration-500 flex items-center justify-between ${scrolled ? 'max-w-6xl rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 py-3 px-6 shadow-2xl' : 'max-w-7xl bg-transparent py-6 px-6 lg:px-8 border border-transparent'}`}>
        <a href="#" className="flex-shrink-0 text-xl font-display font-bold tracking-tight text-white flex items-center">
          <span className="hidden sm:inline">Somnath Baste</span><span className="inline sm:hidden">SB</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-medium">
            {links.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                {item}
              </a>
            ))}
            <ThemeToggle />
          </div>
          
          <div className="flex-shrink-0 border-l border-white/20 pl-4">
            <a href="#contact" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md hover:shadow-blue-500/25 whitespace-nowrap text-sm font-medium">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-4 right-4 ${scrolled ? 'top-20' : 'top-20'} bg-slate-900 border border-white/10 p-4 flex flex-col gap-2 rounded-2xl shadow-2xl lg:hidden overflow-hidden`}
          >
            {links.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10">
              <a href="#contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-slate-950 flex relative items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium backdrop-blur-sm">
            <DraftingCompass className="w-4 h-4" />
            Engineering Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight tracking-tight">
            Engineering<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
              The Future
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
            I am Somnath Baste, a BIM Modeler specializing in Mechanical Building Services, an Entrepreneur, and a Technology Explorer. Building precision models for global megaprojects.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors">
              View Portfolio
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/codewithbaste/somnath.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex gap-8">
            <div className="flex flex-col">
              <span className="text-blue-400 font-bold font-display text-2xl">DAR</span>
              <span className="text-slate-400 text-sm">Al-Handasah</span>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-400 font-bold font-display text-2xl">TCE</span>
              <span className="text-slate-400 text-sm">Tata Consulting</span>
            </div>
          </div>
        </motion.div>
        
        {/* Right side visual placeholder */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative hidden lg:block"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl bg-slate-900">
             <Image src="https://media.licdn.com/dms/image/v2/D5603AQEp_NhsAKnAIA/profile-displayphoto-crop_800_800/B56Z7Z6omPKsAI-/0/1781772488127?e=1783555200&v=beta&t=nYHQvOwkOzQqKhZ3sJH9Zwc7YiTmxFLisJkUcWZKwPA" alt="Somnath Baste LinkedIn Profile" fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 tracking-wider uppercase mb-2">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-500">
              Bridging the gap between engineering precision and technology.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors duration-500">
              With a profound foundation in mechanical building services and hands-on experience on some of the world's most ambitious projects like NEOM and the Central Vista Redevelopment, I specialize in comprehensive BIM modeling, clash detection, and sustainable MEP design.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500">
              Beyond engineering, I am an ambitious entrepreneur and technology founder, constantly exploring ways to optimize AEC pipelines through modern software solutions.
            </p>
          </motion.div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-500"
              >
                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">{stat.value}</div>
                <div className="text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 tracking-wider uppercase mb-2">My Journey</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Professional Experience</h3>
        </motion.div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-[-1px] top-4 bottom-[-3rem] w-px bg-slate-200 dark:bg-slate-700" />
              <div className="hidden md:block absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-slate-50 dark:ring-slate-900" />
              
              <div className="md:ml-12 bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-500">{exp.role}</h4>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-medium mt-1">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 transition-colors duration-500">
                     <MapPin className="w-4 h-4" />
                     {exp.duration} • {exp.location}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed bg-slate-50 dark:bg-slate-900 p-4 rounded-xl transition-colors duration-500">
                  {exp.description}
                </p>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wide transition-colors duration-500">Major Projects Highlights</h5>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 transition-colors duration-500">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'India', 'International'];

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 tracking-wider uppercase mb-2">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Major Projects</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
             {categories.map(c => (
               <button
                 key={c}
                 onClick={() => setFilter(c)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 {c}
               </button>
             ))}
          </motion.div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", borderColor: "#93c5fd" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                key={project.id}
                className="group rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col cursor-pointer transition-colors duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold text-slate-900 dark:text-white transition-colors duration-500">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-500">{project.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1 transition-colors duration-500">
                    {project.description}
                  </p>
                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors duration-500">
                      View Details
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-blue-400 tracking-wider uppercase mb-2">Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Technical Arsenal
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              A comprehensive toolkit combining industry-standard BIM modeling software with a growing aptitude for programmatic problem-solving and software development.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-4">
                 <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                   <Target className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-bold text-white">Precision</h4>
                   <p className="text-sm text-slate-400 mt-1">Zero-tolerance clash detection</p>
                 </div>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-4">
                 <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                   <Server className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-bold text-white">Scale</h4>
                   <p className="text-sm text-slate-400 mt-1">Megaproject environment handling</p>
                 </div>
               </div>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {SKILLS.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-end mb-2">
                  <span className="font-medium text-slate-200">{skill.name}</span>
                  <span className="text-sm text-blue-400 font-display font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                    className="bg-gradient-to-r from-blue-600 to-sky-400 h-2 rounded-full" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VenturesSection() {
  return (
    <section id="ventures" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 tracking-wider uppercase mb-2">Beyond BIM</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors duration-500">Entrepreneurship & Tech Ventures</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto transition-colors duration-500">
            Driven by a builder's mindset, I am actively exploring the intersection of AEC (Architecture, Engineering, Construction) and software. I build custom solutions and contribute to open-source to push the industry forward.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col md:flex-row items-center gap-8 text-left transition-colors duration-500"
        >
          <div className="w-20 h-20 bg-slate-900 dark:bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-colors duration-500">
             <Code className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">CodeWithBaste</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-500">
              A central repository for my personal projects, utility scripts for Revit, and exploration into web technologies. Exploring ways to automate mundane tasks in BIM workflows.
            </p>
            <a href="https://github.com/codewithbaste/somnath.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-medium hover:bg-slate-800 dark:hover:bg-blue-500 transition-colors">
              <Github className="w-5 h-5" />
              Explore GitHub Repository
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 tracking-wider uppercase mb-2">Qualifications</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Certifications</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all shadow-slate-200/50 border border-slate-100 dark:border-slate-800 flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden transition-colors duration-500">
                <Image src={cert.image} alt={cert.title} fill unoptimized className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-white shadow-sm border border-white/10">
                    {cert.issuer}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col items-start text-left border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 transition-colors">{cert.title}</h4>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4 transition-colors duration-500">{cert.date}</div>
                {cert.credentialId && (
                  <div className="text-xs text-slate-400 mb-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-md w-full border border-slate-100 dark:border-slate-800 break-all transition-colors duration-500">
                    ID: {cert.credentialId}
                  </div>
                )}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 w-full transition-colors duration-500">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-500">
                    Skills: <span className="font-normal text-slate-500 dark:text-slate-400">{cert.skills}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-blue-500 tracking-wider uppercase mb-2">Get in Touch</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              Let's build<br />something great.
            </h3>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-md">
              Whether it's discussing megaproject BIM strategies or exploring new software ventures, I'm always open to connecting with fellow professionals and visionaries.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:contact.bastesomnath@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                  <Mail className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors">contact.bastesomnath@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-slate-300 font-medium">Pune, India (Available for Global Relocation)</span>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="https://drive.google.com/file/d/1ZFuiRVQlsoNanS2fbgWOfOd77hPMHZFn/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a href="https://www.linkedin.com/in/somnathbaste" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/somnath_baste" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-center items-center text-center"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Connect on WhatsApp</h4>
            <p className="text-slate-400 mb-8 max-w-sm">
              For direct communication, project inquiries, or quick questions, feel free to reach out via WhatsApp.
            </p>
            <a 
              href="https://wa.me/917507958364" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-green-500 text-slate-950 font-bold hover:bg-green-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Message +91 75079 58364
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 py-12 text-center border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-semibold text-slate-400">&copy; {new Date().getFullYear()} Somnath Baste. All Rights Reserved.</p>
        <p className="text-sm mt-2">BIM Modeler • Building Services • Entrepreneur</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectsSection />
        <SkillsSection />
        <VenturesSection />
        <CertificationsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
