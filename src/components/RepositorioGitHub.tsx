import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
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
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Repositórios GitHub
        </h2>
        {repos.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-gray-400 text-lg animate-pulse">Carregando repositórios...</span>
          </div>
        ) : (
          <div className="relative">
            {/* Setas customizadas */}
            <div className="custom-swiper-prev swiper-button-prev-custom">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="12" fill="rgba(30,41,59,0.7)"/><path d="M15 19l-7-7 7-7" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="custom-swiper-next swiper-button-next-custom">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="12" fill="rgba(30,41,59,0.7)"/><path d="M9 5l7 7-7 7" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.custom-swiper-next',
                prevEl: '.custom-swiper-prev',
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1400: { slidesPerView: 4 }
              }}
              className="pb-16"
            >
              {repos.map((repo) => (
                <SwiperSlide key={repo.id}>
                  <div
                    className="bg-gray-900/80 border-2 border-transparent hover:border-blue-500 rounded-2xl shadow-xl p-8 flex flex-col items-start gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group h-full min-h-[320px]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Github size={32} className="text-blue-400 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-300" />
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {repo.name}
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-4 flex-grow min-h-[60px]">{repo.description || "Sem descrição"}</p>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-blue-600 text-blue-300 hover:text-white font-medium shadow transition-all duration-300"
                      >
                        <Github size={18} /> Código
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition-all duration-300"
                        >
                          <ExternalLink size={18} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default RepositorioGitHub; 