import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Github, ExternalLink } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
}

interface RepositorioGitHubProps {
  repos: Repository[];
}

const RepositorioGitHub: React.FC<RepositorioGitHubProps> = ({ repos }) => {
  return (
    <section id="repositorios" className="relative py-24">
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Repositórios GitHub</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-16"
        >
          {repos.map((repo) => (
            <SwiperSlide key={repo.id}>
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-4">{repo.name}</h3>
                <p className="text-gray-300 mb-6 flex-grow">{repo.description || "Sem descrição"}</p>
                <div className="flex gap-6">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                    <Github size={18} /> Código
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <ExternalLink size={18} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </Swiper>
      </div>
    </section>
  );
};

export default RepositorioGitHub; 