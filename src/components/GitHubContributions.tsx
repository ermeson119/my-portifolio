import { useState, useEffect } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionStats {
  totalContributions: number;
  maxStreak: number;
  currentStreak: number;
}

const GitHubContributions = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<ContributionStats>({
    totalContributions: 0,
    maxStreak: 0,
    currentStreak: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const username = "ermeson119";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchContributions = async () => {
      setError(null);
      if (!token) {
        setError("Token do GitHub não encontrado. Defina VITE_GITHUB_TOKEN no .env.");
        return;
      }

      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
              contributionCalendar {
                totalContributions
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
          
          // Calcular estatísticas
          const totalContributions = days.reduce((sum: number, day: ContributionDay) => sum + day.contributionCount, 0);
          let currentStreak = 0;
          let maxStreak = 0;
          let tempStreak = 0;

          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].contributionCount > 0) {
              tempStreak++;
              if (i === days.length - 1) {
                currentStreak = tempStreak;
              }
            } else {
              maxStreak = Math.max(maxStreak, tempStreak);
              tempStreak = 0;
            }
          }
          maxStreak = Math.max(maxStreak, tempStreak);

          setStats({
            totalContributions,
            maxStreak,
            currentStreak,
          });
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

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-[#161b22]";
    if (count <= 3) return "bg-[#0e4429]";
    if (count <= 6) return "bg-[#006d32]";
    if (count <= 9) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Função para obter os meses do ano atual
  const getMonthsForYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - 11 + i + 12) % 12;
      const date = new Date(currentYear, monthIndex, 1);
      months.push(date.toLocaleString('pt-BR', { month: 'short' }));
    }
    return months;
  };

  const monthNames = getMonthsForYear();

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
      </video>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Contribuições no GitHub</h2>
        
        {/* Estatísticas */}
        <div className="flex justify-center gap-8 mb-12 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg min-w-[200px]">
            <div className="text-2xl font-bold text-blue-400">{stats.totalContributions}</div>
            <div className="text-gray-300">Contribuições em {year}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg min-w-[200px]">
            <div className="text-2xl font-bold text-blue-400">{stats.currentStreak}</div>
            <div className="text-gray-300">Sequência atual</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg min-w-[200px]">
            <div className="text-2xl font-bold text-blue-400">{stats.maxStreak}</div>
            <div className="text-gray-300">Maior sequência</div>
          </div>
        </div>

        {/* Seleção do Ano */}
        <div className="flex justify-center mb-8">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="p-3 border rounded text-black bg-white/90 backdrop-blur-sm"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>

        {/* Exibição de Erros */}
        {error && (
          <div className="text-red-400 text-center mb-8 bg-red-900/20 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Exibição das Contribuições */}
        {contributions.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl flex justify-center mb-6">
              <div className="grid grid-cols-12 gap-3 text-sm text-gray-400">
                {monthNames.map((month, index) => (
                  <span key={index} className="text-center">{month}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: Math.ceil(contributions.length / 7) }).map((_, weekIndex) => (
                <ul key={weekIndex} className="grid grid-cols-1 gap-2">
                  {contributions.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, index) => (
                    <li
                      key={index}
                      className={`w-4 h-4 rounded ${getContributionColor(day.contributionCount)} transition-all duration-200 hover:scale-125`}
                      title={`${formatDate(day.date)}: ${day.contributionCount} contribuição${day.contributionCount !== 1 ? 's' : ''}`}
                    />
                  ))}
                  {weekIndex === Math.ceil(contributions.length / 7) - 1 &&
                    Array.from({ length: 7 - (contributions.length % 7) }).map((_, emptyIndex) => (
                      <li key={`empty-${emptyIndex}`} className="w-4 h-4 rounded bg-[#161b22]" />
                    ))}
                </ul>
              ))}
            </div>

            {/* Legenda */}
            <div className="flex items-center gap-2 mt-8 text-sm text-gray-400">
              <span>Menos</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded bg-[#161b22]" />
                <div className="w-3 h-3 rounded bg-[#0e4429]" />
                <div className="w-3 h-3 rounded bg-[#006d32]" />
                <div className="w-3 h-3 rounded bg-[#26a641]" />
                <div className="w-3 h-3 rounded bg-[#39d353]" />
              </div>
              <span>Mais</span>
            </div>
          </div>
        ) : (
          !error && <div className="text-gray-400 text-center">Carregando contribuições...</div>
        )}
      </div>
    </section>
  );
};

export default GitHubContributions;