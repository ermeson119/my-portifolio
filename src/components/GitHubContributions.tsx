import { useState, useEffect } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

const GitHubContributions = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const username = "ermeson119";
  const token = import.meta.env.VITE_GITHUB_TOKEN; // Pegando o token da variável de ambiente

  useEffect(() => {
    const fetchContributions = async () => {
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

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.data) {
        const days =
          data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
            (week: { contributionDays: ContributionDay[] }) =>
              week.contributionDays
          );
        setContributions(days);
      }
    };

    if (token) {
      fetchContributions();
    } else {
      console.error(
        "Token do GitHub não encontrado. Defina VITE_GITHUB_TOKEN no .env."
      );
    }
  }, [year]);

  return (
    <div id="git" className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/assets/video3.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      <div className="bg-black bg-opacity-50 py-10 mb-96 text-white text-center  w-full">
        <h2 className="text-2xl mb-20 font-bold">Contribuições no GitHub</h2>

        {/* Seleção do Ano */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 w-32 text-center border rounded text-black"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>

        {/* Exibição das Contribuições */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full flex justify-center mb-2">
            <div className="grid grid-cols-53 gap-8">
              {[
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "Jan",
                "Feb",
              ].map((month, index) => (
                <span
                  key={index}
                  className="text-gray-400 text-xs text-center"
                  style={{ gridColumn: `${index * 4 + 1} / span 4` }}
                >
                  {month}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(contributions.length / 7) }).map(
              (_, weekIndex) => (
                <ul key={weekIndex} className="grid grid-cols-1 gap-1">
                  {contributions
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, index) => (
                      <li
                        key={index}
                        className={`w-6 h-6 rounded ${
                          day.contributionCount > 0
                            ? "bg-green-500"
                            : "bg-gray-700"
                        }`}
                        title={`${day.date}: ${day.contributionCount} contribuições`}
                      ></li>
                    ))}
                  {/* Preenche as colunas vazias no final */}
                  {weekIndex === Math.ceil(contributions.length / 7) - 1 &&
                    Array.from({ length: 7 - (contributions.length % 7) }).map(
                      (_, emptyIndex) => (
                        <li
                          key={`empty-${emptyIndex}`}
                          className="w-6 h-6 rounded bg-gray-700"
                        ></li>
                      )
                    )}
                </ul>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
