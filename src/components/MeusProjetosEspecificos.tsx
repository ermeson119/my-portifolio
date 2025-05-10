import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Github, ExternalLink } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  tecnologias: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const MeusProjetosEspecificos: React.FC = () => {
  const projetos: Projeto[] = [
    {
      id: 1,
      titulo: "Sistema de Gestão Escolar",
      descricao: "Sistema completo para gestão de escolas, incluindo matrículas, notas, frequência e comunicação com pais.",
      imagem: "/assets/projetos/gestao-escolar.jpg",
      tecnologias: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      githubUrl: "https://github.com/seu-usuario/gestao-escolar",
      demoUrl: "https://gestao-escolar-demo.com"
    },
    {
      id: 2,
      titulo: "E-commerce de Produtos Digitais",
      descricao: "Plataforma de venda de produtos digitais com sistema de pagamento integrado e gestão de conteúdo.",
      imagem: "/assets/projetos/ecommerce.jpg",
      tecnologias: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/seu-usuario/ecommerce-digital",
      demoUrl: "https://ecommerce-digital-demo.com"
    },
    // Adicione mais projetos aqui
  ];

  return (
    <section id="projetos-especificos" className="relative py-24">
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
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={projeto.imagem} 
                    alt={projeto.titulo}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-3">{projeto.titulo}</h3>
                  <p className="text-gray-300 mb-4">{projeto.descricao}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projeto.tecnologias.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {projeto.githubUrl && (
                      <a 
                        href={projeto.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        <Github size={18} /> Código
                      </a>
                    )}
                    {projeto.demoUrl && (
                      <a 
                        href={projeto.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink size={18} /> Demo
                      </a>
                    )}
                  </div>
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

export default MeusProjetosEspecificos; 