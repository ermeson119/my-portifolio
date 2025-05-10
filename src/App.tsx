import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import Typed from "typed.js";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GitHubContributions from "./components/GitHubContributions";
import MeusProjetos from "./components/MeusProjetos";
import ListaDeIcones from "./components/ListaDeIcones";
import ProjetosGitHub from "./components/ProjetosGitHub";


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
        <nav className="fixed top-0 w-full bg-gray-900 shadow-lg z-50 backdrop-blur-md bg-opacity-90">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap gap-6">
                {["home", "about", "project", "git"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-base font-medium hover:text-blue-400 transition-colors ${
                      activeSection === section ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
                <a
                  href="/Curriculo-ErmesonBalbinot.pdf"
                  download
                  className="text-base font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Currículo <Download size={18} />
                </a>
              </div>
              <ListaDeIcones />
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
          <div className="container mx-auto px-6 py-24 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Ermeson Balbinot</h1>
                <div className="typed-container">
                  <span ref={el} className="text-xl md:text-2xl text-blue-400 inline-block"></span>
                </div>
                <button className="mt-8 px-6 py-3 bg-blue-900 font-bold rounded-full hover:bg-blue-800 transition-colors">
                  <a
                    href="/Curriculo-ErmesonBalbinot.pdf"
                    download
                    className="flex items-center gap-2 text-white"
                  >
                    Download Currículo <Download size={18} />
                  </a>
                </button>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                  alt="Ermeson's Profile"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-400 shadow-lg"
                />
                <div className="flex gap-4 mt-6">
                  <a href="https://github.com/ermeson119" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="mailto:ermeson.balbinot10@gmail.com" className="hover:text-blue-400 transition-colors">
                    <Mail size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/ermeson-balbinot" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    <Linkedin size={24} />
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Saiba quem sou</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg mb-8">
              Olá pessoal, eu sou Ermeson, moro no Brasil em Palmas-TO. Atualmente trabalho como analista de sistemas e desenvolvedor na SECAD-TO.
            </p>
            <p className="text-base md:text-lg mb-8">Além da programação em si, estudo também...</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {["Governança de TI", "Gerência de Projetos", "Engenharia de Requisitos"].map((item) => (
                <div key={item} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{item}</h3>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-8">Tecnologias</h3>
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
                <div key={tech.name} className={`tech-icon ${tech.name.toLowerCase()}`}>
                  <img src={tech.src} alt={tech.name} className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MeusProjetos />
      <GitHubContributions />
      <ProjetosGitHub repos={repos} />
    </div>
  );
}

export default App;