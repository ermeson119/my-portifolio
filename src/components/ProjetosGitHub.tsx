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

interface ProjetosGitHubProps {
  repos: Repository[];
}

const ProjetosGitHub: React.FC<ProjetosGitHubProps> = ({ repos }) => {
  return (
    <div id="project-git" className="bg-gray-900 py-20 pb-60">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-44">
          Projetos Github
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
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default ProjetosGitHub;
