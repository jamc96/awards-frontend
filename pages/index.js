import classNames from "classnames";
import { useState } from "react";
import ScoreTable from "./components/scoreTable";
import ScoreCard from "./components/scoreCard";
import Image from "./components/shared/image";

export default function Home({ event }) {
  const tabs = [
    { id: 0, label: "resultados" },
    { id: 1, label: "escuelas" },
  ];

  const { awards } = event;

  const dataBySchools = awards.map((data) => {
    const { player, award } = data;
    if (!player || !award) {
      return {};
    }

    return {
      id: player.school.id,
      name: player.school.name,
      image: player.school.image,
      code: player.school.code,
      award: {
        id: award.id,
        name: award.name,
        value: award.value,
      },
      player: {
        id: player.id,
        name: player.name,
        image: player.image,
      },
    };
  });
  // this is for object not being generated because it is missing some required value
  const dataBySchoolsCleaned = dataBySchools.filter(
    (x) => Object.keys(x).length !== 0
  );

  let schoolsArray = [];
  dataBySchoolsCleaned.forEach((school) => {
    const schoolFound = schoolsArray.find((s) => s.id === school.id);

    if (!schoolFound) {
      schoolsArray.push({
        id: school.id,
        name: school.name,
        image: school.image,
        code: school.code,
        awards: {
          first: school.award.name.toLowerCase() === "primero" ? 1 : 0,
          second: school.award.name.toLowerCase() === "segundo" ? 1 : 0,
          third: school.award.name.toLowerCase() === "tercero" ? 1 : 0,
        },
        total: 1,
        points: school.award.value,
        players: [{ ...school.player }],
      });
    } else {
      const schoolIndex = schoolsArray.findIndex((s) => s.id === school.id);
      const currentSchoolAwards = schoolsArray[schoolIndex].awards;
      const currentSchoolTotal = schoolsArray[schoolIndex].total;
      const currentSchoolPoints = schoolsArray[schoolIndex].points;
      schoolsArray[schoolIndex].awards = {
        first:
          school.award.name.toLowerCase() === "primero"
            ? currentSchoolAwards.first + 1
            : currentSchoolAwards.first,
        second:
          school.award.name.toLowerCase() === "segundo"
            ? currentSchoolAwards.second + 1
            : currentSchoolAwards.second,
        third:
          school.award.name.toLowerCase() === "tercero"
            ? currentSchoolAwards.third + 1
            : currentSchoolAwards.third,
      };
      schoolsArray[schoolIndex].total = currentSchoolTotal + 1;
      schoolsArray[schoolIndex].points =
        currentSchoolPoints + school.award.value;
    }
  });

  schoolsArray = schoolsArray.sort((x, y) => (x.points < y.points ? 1 : -1));

  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 relative flex flex-col sm:gap-y-4 ">
      {/* header */}
      <div className="pt-8 flex flex-col gap-y-6 items-center justify-center w-full ">
        <Image className="w-44 h-44 object-cover" {...event.image} />
        <h1 className="text-3xl md:text-4xl">{event.name}</h1>
      </div>
      {/* navigation */}
      <div className="pb-2 flex flex-row w-full justify-center gap-2 max-w-sm mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={classNames(
              "text-center w-full py-2 border-b md:text-lg",
              {
                "text-red-600 border-red-600": tab.label === selectedTab,
                "text-gray-50 border-gray-700": tab.label !== selectedTab,
              }
            )}
            onClick={() => setSelectedTab(tab.label)}
          >
            <span className="capitalize">{tab.label}</span>
          </button>
        ))}
      </div>
      {selectedTab === "resultados" ? (
        <ScoreTable schools={schoolsArray} />
      ) : (
        <ScoreCard
          schools={schoolsArray}
          playersBySchool={dataBySchoolsCleaned}
        />
      )}

      <div className="h-24 w-full px-8 absolute inset-x-0 bottom-0">
        <p className="text-center italic font-light md:text-lg">
          {`"Un Esfuerzo Total, Es una Victoria Completa. Formando Campeones Para
          La Vida"`}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/events");
  const events = await res.json();

  const event = events.data[0];

  return {
    props: {
      event,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
