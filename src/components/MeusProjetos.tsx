import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ExternalLink, Github } from "lucide-react";

const MeusProjetos = () => {
  const projetos = [
    {
      id: 1,
      name: "Projeto 1",
      description: "Descrição do projeto 1",
      html_url: "https://github.com/seu-usuario/projeto1",
      homepage: "https://seuprojeto1.com",
    },
    {
      id: 2,
      name: "Projeto 2",
      description: "Descrição do projeto 2",
      html_url: "https://github.com/seu-usuario/projeto2",
      homepage: "https://seuprojeto2.com",
    },
    {
      id: 3,
      name: "Projeto 3",
      description: "Descrição do projeto 3",
      html_url: "https://github.com/seu-usuario/projeto3",
      homepage: "",
    },
    {
      id: 4,
      name: "Projeto 4",
      description: "Descrição do projeto 4",
      html_url: "https://github.com/seu-usuario/projeto4",
      homepage: "https://seuprojeto4.com",
    },
    {
      id: 5,
      name: "Projeto 5",
      description: "Descrição do projeto 5",
      html_url: "https://github.com/seu-usuario/projeto5",
      homepage: "",
    },
    {
      id: 6,
      name: "Projeto 6",
      description: "Descrição do projeto 6",
      html_url: "https://github.com/seu-usuario/projeto6",
      homepage: "https://seuprojeto6.com",
    },
    {
      id: 7,
      name: "Projeto 7",
      description: "Descrição do projeto 7",
      html_url: "https://github.com/seu-usuario/projeto7",
      homepage: "",
    },
    {
      id: 8,
      name: "Projeto 8",
      description: "Descrição do projeto 8",
      html_url: "https://github.com/seu-usuario/projeto8",
      homepage: "https://seuprojeto8.com",
    },
    {
      id: 9,
      name: "Projeto 9",
      description: "Descrição do projeto 9",
      html_url: "https://github.com/seu-usuario/projeto9",
      homepage: "",
    },
    {
      id: 10,
      name: "Projeto 10",
      description: "Descrição do projeto 10",
      html_url: "https://github.com/seu-usuario/projeto10",
      homepage: "https://seuprojeto10.com",
    },
  ];

  return (
    <section id="project" className="relative py-24">
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meus Projetos</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-16"
        >
          {projetos.map((projeto) => (
            <SwiperSlide key={projeto.id}>
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-4">{projeto.name}</h3>
                <p className="text-gray-300 mb-6 flex-grow">{projeto.description}</p>
                <div className="flex gap-6">
                  <a href={projeto.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                    <Github size={18} /> Código
                  </a>
                  {projeto.homepage && (
                    <a href={projeto.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
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

export default MeusProjetos;