import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";
import Typed from "typed.js";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GitHubContributions from "./components/GitHubContributions";

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-800 shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex  h-16 space-x-8">
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
            <a
              href="/Curriculo-ErmesonBalbinot.pdf"
              download
              className="text-lg font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              Currículo <Download size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="container mx-auto px-5 pt-80 pb-70">
        <div className="flex flex-row items-center justify-between">
          <div className="text-left mb-32">
            <h1 className="text-5xl font-bold mb-9">Ermeson Balbinot</h1>
            <span ref={el} className="text-2xl text-blue-400 h-20"></span>

            <button className="flex mt-11 p-5 bg-blue-900 font-bold h-12 w-60 rounded-full"><a
              href="/Curriculo-ErmesonBalbinot.pdf"
              download
              className="text-lg font-medium hover:text-blue-400 transition-colors flex items-center gap-2"
            >
             Download Currículo <Download size={20} />
            </a></button>
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

      {/* About Section */}
      <div id="about" className="bg-gray-900 py-20 mt-16 mb-16">
        <div className="container mx-auto px-4">
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

      {/* GitHub Contributions */}
      <GitHubContributions />

      {/* Projects Section */}
      <div className="bg-gray-800 py-80">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Meus Projetos
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12 relative"
          >
            {repos.map((repo) => (
              <SwiperSlide key={repo.id}>
                <div className="bg-gray-700 rounded-lg p-6 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-3">{repo.name}</h3>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {repo.description || "No description available"}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <Github size={20} />
                      <span>Código</span>
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink size={20} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev absolute -left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="swiper-button-next absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
