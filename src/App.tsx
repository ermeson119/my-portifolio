import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import Typed from "typed.js";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GitHubContributions from "./components/GitHubContributions";
import MeusProjetosEspecificos from "./components/MeusProjetosEspecificos";
import ListaDeIcones from "./components/ListaDeIcones";
import RepositorioGitHub from "./components/RepositorioGitHub";


interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
}

function App() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const el = React.useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Analista de T.I",
        "Desenvolvedor WEB",
        "Desenvolvedor Full Stack",
        "Especialista em Soluções Digitais",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "|", 
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/ermeson119/repos");
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepos();
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <div className="min-h-screen text-white">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full bg-gray-900/80 shadow-lg z-50 backdrop-blur-md transition-all duration-300">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                  alt="Logo"
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Ermeson Balbinot Andrade
                </span>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6">
                  {[
                    { id: "home", label: "Início" },
                    { id: "about", label: "Sobre" },
                    { id: "projetos-especificos", label: "Projetos" },
                    { id: "repositorios", label: "Repositórios" },
                    { id: "git", label: "Contribuições" }
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-base font-medium transition-all duration-300 hover:text-blue-400 ${
                        activeSection === section.id 
                          ? "text-blue-400 scale-110" 
                          : "text-gray-300"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/Curriculo-ErmesonBalbinot.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline">Currículo</span>
                  </a>

                  <div className="flex items-center gap-4">
                    <a 
                      href="https://github.com/ermeson119" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ermeson-balbinot" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="mailto:ermeson.balbinot10@gmail.com" 
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                    >
                      <Mail size={20} />
                    </a>
                  </div>

                  {/* Menu Mobile */}
                  <button 
                    className="md:hidden text-gray-300 hover:text-blue-400 transition-colors"
                    onClick={() => {
                      // Implementar menu mobile
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 home-video"
            style={{
              filter: "brightness(0.7) contrast(1.1)",
              objectFit: "cover",
              objectPosition: "center",
              minHeight: "100vh",
              width: "100%",
              height: "100%",
              transform: "scale(1.1)"
            }}
          >
            <source src="/assets/video1.mp4" type="video/mp4" />
          </video>
          <div className="container mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-left max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Ermeson Balbinot
                </h1>
                <div className="typed-container mb-8">
                  <span ref={el} className="text-2xl md:text-3xl text-gray-300 inline-block"></span>
                </div>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Transformando ideias em soluções digitais inovadoras
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 font-bold rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <a
                      href="/Curriculo-ErmesonBalbinot.pdf"
                      download
                      className="flex items-center gap-3 text-white text-lg"
                    >
                      Download Currículo <Download size={20} />
                    </a>
                  </button>
                  <a 
                    href="mailto:ermeson.balbinot10@gmail.com"
                    className="px-8 py-4 bg-gray-800 font-bold rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-lg flex items-center justify-center gap-3"
                  >
                    Entre em Contato <Mail size={20} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-75"></div>
                  <img
                    src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                    alt="Ermeson's Profile"
                    className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-blue-400 shadow-xl"
                  />
                </div>
                <div className="flex gap-6 mt-8">
                  <a 
                    href="https://github.com/ermeson119" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors transform hover:scale-110"
                  >
                    <Github size={28} />
                  </a>
                  <a 
                    href="mailto:ermeson.balbinot10@gmail.com" 
                    className="hover:text-blue-400 transition-colors transform hover:scale-110"
                  >
                    <Mail size={28} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ermeson-balbinot" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-400 transition-colors transform hover:scale-110"
                  >
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* About Section */}
      <section id="about" className="relative py-24">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          style={{
            filter: "brightness(0.7) contrast(1.1)",
            objectFit: "cover",
            objectPosition: "center",
            minHeight: "100%",
            width: "100%",
            height: "100%",
            transform: "scale(1.1)"
          }}
        >
          <source src="/assets/video3.mp4" type="video/mp4" />
        </video>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Saiba quem sou
          </h2>
          <div className="flex justify-center">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10 px-8 py-10 max-w-3xl w-full border border-blue-900/30">
              {/* Foto com efeito */}
              <div className="relative flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-700 blur-xl opacity-60 animate-pulse"></span>
                <img
                  src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                  alt="Ermeson Balbinot"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-500 shadow-xl object-cover z-10"
                />
              </div>
              {/* Texto e botões */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Ermeson Balbinot
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto md:mx-0">
                  Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras.<br/>
                  Analista de sistemas na SECAD-TO, Palmas-TO.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <a 
                    href="https://github.com/ermeson119" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 hover:bg-blue-700 text-gray-200 hover:text-white font-medium shadow transition-all duration-300"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ermeson-balbinot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-all duration-300"
                  >
                    <Linkedin size={20} /> LinkedIn
                  </a>
                  <a 
                    href="mailto:ermeson.balbinot10@gmail.com"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 hover:bg-blue-700 text-gray-200 hover:text-white font-medium shadow transition-all duration-300"
                  >
                    <Mail size={20} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Áreas de Estudo */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Áreas de Estudo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Governança de TI",
                  description: "Gestão estratégica de tecnologia da informação e melhores práticas de governança.",
                  icon: "🏢"
                },
                {
                  title: "Gerência de Projetos",
                  description: "Metodologias ágeis, gestão de equipes e planejamento estratégico de projetos.",
                  icon: "📊"
                },
                {
                  title: "Engenharia de Requisitos",
                  description: "Análise e documentação de requisitos para desenvolvimento de software.",
                  icon: "📝"
                }
              ].map((area, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">{area.title}</h4>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Tecnologias</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
                { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "Bootstrap", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
                { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                { name: "Spring", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
              ].map((tech) => (
                <div 
                  key={tech.name} 
                  className="tech-icon group relative"
                >
                  <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-800/70">
                    <img 
                      src={tech.src} 
                      alt={tech.name} 
                      className="w-12 h-12 md:w-16 md:h-16 mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                    />
                    <p className="text-center mt-2 text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                      {tech.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MeusProjetosEspecificos />
      <GitHubContributions />
      <RepositorioGitHub repos={repos} />

      {/* Footer */}
      <footer className="relative bg-gray-900/90 backdrop-blur-md py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Coluna 1 - Sobre */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                  alt="Logo"
                  className="w-12 h-12 rounded-full border-2 border-blue-400"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Ermeson Balbinot
                </span>
              </div>
              <p className="text-gray-400">
                Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras e impactantes.
              </p>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
              <ul className="space-y-2">
                {[
                  { label: "Início", href: "#home" },
                  { label: "Sobre", href: "#about" },
                  { label: "Projetos", href: "#projetos-especificos" },
                  { label: "Repositórios", href: "#repositorios" },
                  { label: "Contribuições", href: "#git" }
                ].map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.replace('#', ''));
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3 - Contato */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contato</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:ermeson.balbinot10@gmail.com"
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Mail size={18} />
                    ermeson.balbinot10@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/ermeson119"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Github size={18} />
                    github.com/ermeson119
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/ermeson-balbinot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin size={18} />
                    linkedin.com/in/ermeson-balbinot
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha Divisória */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Ermeson Balbinot. Todos os direitos reservados.</p>
            <p className="mt-1">Desenvolvido com ❤️ usando React e Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;