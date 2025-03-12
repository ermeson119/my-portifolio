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
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/ermeson119/repos"
        );
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
      <nav className="fixed top-0 w-full bg-gray-800 shadow-lg z-50 backdrop-blur-md bg-opacity-80 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`text-lg font-medium hover:text-blue-400 transition-colors ${
                  activeSection === "home" ? "text-blue-400" : "text-white"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`text-lg font-medium hover:text-blue-400 transition-colors ${
                  activeSection === "about" ? "text-blue-400" : "text-white"
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("project")}
                className={`text-lg font-medium hover:text-blue-400 transition-colors ${
                  activeSection === "project" ? "text-blue-400" : "text-white"
                }`}
              >
                Projetos
              </button>
              <button
                onClick={() => scrollToSection("git")}
                className={`text-lg font-medium hover:text-blue-400 transition-colors ${
                  activeSection === "project" ? "text-blue-400" : "text-white"
                }`}
              >
                Git
              </button>
              <a
                href="/Curriculo-ErmesonBalbinot.pdf"
                download
                className="text-lg font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                Currículo <Download size={20} />
              </a>
            </div>
            <ListaDeIcones />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        id="home"
        className="relative w-full h-screen flex justify-center items-center overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 0) 100%)",
            backgroundColor: "black", // Garante que a transição não fique branca
          }}
        >
          <source src="/assets/video1.mp4" type="video/mp4" />
        </video>

        {/* Conteúdo da Home */}
        <div className="container mx-auto px-5 pt-20 pb-70 relative text-white text-center">
          <div className="flex flex-row items-center justify-between">
            <div className="text-left mb-32">
              <h1 className="text-5xl font-bold mb-9">Ermeson Balbinot</h1>
              <span ref={el} className="text-2xl text-blue-400 h-20"></span>

              <button className="flex mt-20 p-5 bg-blue-900 font-bold h-14 w-60 rounded-full">
                <a
                  href="/Curriculo-ErmesonBalbinot.pdf"
                  download
                  className="text-lg font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Download Currículo <Download size={20} />
                </a>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://avatars.githubusercontent.com/u/108281544?s=400&u=f1cd85e875fbf00a544ba21b62de45cba85017b8&v=4"
                alt="Ermeson's Profile"
                className="w-50 h-50 rounded-full border-4 border-blue-400 shadow-lg animate-floating"
              />
              <div className="flex gap-4 mt-10">
                <a
                  href="https://github.com/ermeson119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-400 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="mailto:ermeson.balbinot10@gmail.com"
                  className="p-2 hover:text-blue-400 transition-colors"
                >
                  <Mail size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ermeson-balbinot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="relative w-full h-screen flex justify-center items-center overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-32 before:bg-gradient-to-b before:to-transparent"
      >
        <video
          autoPlay
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0.3) 90%, rgba(0, 0, 0, 0) 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0.3) 90%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <source src="/assets/video3.mp4" type="video/mp4" />
        </video>

        <div className="container mx-auto px-4 mt-72">
          <h2 className="text-4xl font-bold text-center mb-12">
            Saiba quem sou
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-8">
              Olá pessoal, eu sou Ermeson moro no Brasil em Palmas-TO.
              Atualmente trabalho como analista de sistemas e desenvolvedor na
              SECAD-TO.
            </p>
            <p className="text-lg mb-8">
              Além da programação em si, estudo também...
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Governança de TI</h3>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Gerencia de projetos
                </h3>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Engenharia de requisitos
                </h3>
              </div>
            </div>

            {/* Technology Stack */}
            <h3 className="text-2xl font-bold mb-8">Tecnologias</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="tech-icon react">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon django">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
                  alt="Django"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon python">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon css">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                  alt="CSS"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon html">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                  alt="HTML"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon bootstrap">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                  alt="Bootstrap"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon java">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                  alt="Java"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <div className="tech-icon spring">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
                  alt="Spring Boot"
                  className="w-16 h-16 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MeusProjetos />
      <GitHubContributions />

      <ProjetosGitHub repos={repos} />
    </div>
  );
}

export default App;
