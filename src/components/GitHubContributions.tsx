import { useState, useEffect } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

const GitHubContributions = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const username = "ermeson119";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchContributions = async () => {
      setError(null); // Limpa erros anteriores
      if (!token) {
        setError("Token do GitHub não encontrado. Defina VITE_GITHUB_TOKEN no .env.");
        return;
      }

      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
          setError("Erro ao buscar contribuições: " + data.errors[0].message);
          return;
        }

        if (data.data && data.data.user) {
          const days = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
            (week: { contributionDays: ContributionDay[] }) => week.contributionDays
          );
          setContributions(days);
        } else {
          setError("Nenhuma contribuição encontrada para o usuário.");
        }
      } catch (err) {
        setError("Falha ao buscar contribuições. Verifique sua conexão ou o token.");
        console.error("Erro ao buscar contribuições:", err);
      }
    };

    fetchContributions();
  }, [year]);

  return (
    <section id="git" className="relative py-24">
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
        Seu navegador não suporta vídeos HTML5.
      </video>

      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Contribuições no GitHub</h2>

        {/* Seleção do Ano */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-3 border rounded text-black mb-8 bg-white"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>

        {/* Exibição de Erros */}
        {error && (
          <div className="text-red-400 mb-8">
            {error}
          </div>
        )}

        {/* Exibição das Contribuições */}
        {contributions.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl flex justify-center mb-6">
              <div className="grid grid-cols-12 gap-3 text-sm text-gray-400">
                {["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((month, index) => (
                  <span key={index} className="text-center">{month}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: Math.ceil(contributions.length / 7) }).map((_, weekIndex) => (
                <ul key={weekIndex} className="grid grid-cols-1 gap-2">
                  {contributions.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, index) => {
                    // Determina o nível de contribuição para coloração
                    const level = day.contributionCount > 0 ? Math.min(Math.ceil(day.contributionCount / 5), 4) : 0;
                    return (
                      <li
                        key={index}
                        className={`w-4 h-4 rounded contribution-day contribution-day[data-level="${level}"]`}
                        title={`${day.date}: ${day.contributionCount} contribuições`}
                      />
                    );
                  })}
                  {weekIndex === Math.ceil(contributions.length / 7) - 1 &&
                    Array.from({ length: 7 - (contributions.length % 7) }).map((_, emptyIndex) => (
                      <li key={`empty-${emptyIndex}`} className="w-4 h-4 rounded bg-gray-700" />
                    ))}
                </ul>
              ))}
            </div>
          </div>
        ) : (
          !error && <div className="text-gray-400">Carregando contribuições...</div>
        )}
      </div>
    </section>
  );
};

export default GitHubContributions;