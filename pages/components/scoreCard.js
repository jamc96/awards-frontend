import Image from "./shared/image";

const ScoreCard = ({ schools, playersBySchool }) => {
  return (
    <div className="w-full max-w-4xl mx-auto h-96 overflow-y-auto grid grid-cols-1 gap-2 sm:grid-cols-2 ">
      {schools.map((school) => (
        <div
          key={`school-card-${school.id}`}
          className="pt-4 bg-gray-50  shadow-sm shadow-gray-100 col-span-1"
        >
          <div className="flex flex-row items-center gap-4 px-8 pb-2 border-b-2">
            <div className="w-14 h-14 shadow-md rounded-full">
              <Image
                {...school.image}
                className="w-full h-full p-2 object-cover"
              />
            </div>
            <h2 className="text-gray-900 text-sm">{school.name}</h2>
          </div>
          <div className="flex flex-row items-center py-2 text-sm border-b-2">
            <div className="flex-1 flex flex-col justify-center items-center text-red-400">
              <span>{school.awards.first}</span>
              <p className="text-gray-500 text-xs">Primeros</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-red-400">
              <span>{school.awards.second}</span>
              <p className="text-gray-500 text-xs">Segundos</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-red-400">
              <span>{school.awards.third}</span>
              <p className="text-gray-500 text-xs">Terceros</p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-red-400">
              <span>{school.points}</span>
              <p className="text-gray-500 text-xs">Puntos</p>
            </div>
          </div>
          <div>
            {playersBySchool
              .filter((s) => s.id === school.id)
              .map((school) => (
                <div
                  key={`player-school-${school.player.id}`}
                  className="py-4 px-8 flex flex-row justify-between bg-gray-100 border-b-2 text-sm text-gray-800"
                >
                  <div className="text-gray-500">{school.player.name}</div>
                  <div>{school.award.name}</div>
                  <div className="text-red-400">{school.award.value}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;
