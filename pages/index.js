import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const tabs = [
    { id: 0, label: "premiaciones" },
    { id: 1, label: "jugadores" },
  ];
  const schools = [
    {
      id: 0,
      name: "Bill",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 2,
        second: 3,
        third: 5,
      },
      total: 10,
      points: 32,
    },
    {
      id: 1,
      name: "KG",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 2,
        second: 4,
        third: 1,
      },
      total: 7,
      points: 24,
    },
    {
      id: 2,
      name: "OSA",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 1,
        second: 1,
        third: 1,
      },
      total: 3,
      points: 20,
    },
    {
      id: 3,
      name: "NCA",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 1,
        second: 0,
        third: 5,
      },
      total: 3,
      points: 18,
    },
    {
      id: 4,
      name: "GUA",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 0,
        second: 6,
        third: 5,
      },
      total: 11,
      points: 10,
    },
    {
      id: 5,
      name: "LGB",
      logo: {
        url: "/logo.jpg",
        alternativeText: "some logo",
      },
      awards: {
        first: 0,
        second: 0,
        third: 0,
      },
      total: 0,
      points: 1,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  const [selectedRow, setSelectedRow] = useState(schools[0].id);
  return (
    <div className="h-screen w-screen bg-black text-white px-8 space-y-10 relative flex flex-col">
      {/* header */}
      <div className="flex-1 pt-14 flex flex-col gap-y-6 items-center justify-center w-full ">
        <img src="/logo.jpg" className="w-48 h-48 object-cover" />
        <h1 className="text-3xl">Copa UTF 2022</h1>
      </div>
      {/* navigation */}
      <div className="flex flex-row w-full justify-center gap-2 max-w-sm mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={classNames("text-center w-full py-2 border-b", {
              "text-red-600 border-red-600": tab.label === selectedTab,
              "text-gray-50 border-gray-700": tab.label !== selectedTab,
            })}
            onClick={() => setSelectedTab(tab.label)}
          >
            <span className="capitalize">{tab.label}</span>
          </button>
        ))}
      </div>
      {/* awards table */}
      <div className="w-full">
        <table className="w-full max-w-4xl mx-auto">
          <tr className=" text-left text-sm border-b border-gray-700">
            <th className="font-light py-4">#</th>
            <th className="font-medium">Escuela</th>
            <th className="font-medium">1ro</th>
            <th className="font-medium">2do</th>
            <th className="font-medium">3ro</th>
            <th className="font-medium">TTL</th>
            <th className="font-medium">PTS</th>
          </tr>
          {schools.map((school, index) => (
            <tr
              key={school.id}
              className={classNames("font-extralight cursor-pointer", {
                "bg-red-400 rounded-lg": school.id === selectedRow,
              })}
              onClick={() => setSelectedRow(school.id)}
            >
              <td className="px-2">{index + 1}</td>
              <td>
                <div className="py-2 w-24 flex flex-row items-center gap-x-2">
                  <img src="/logo.jpg" className="w-4 h-4 object-cover" />
                  <span>{school.name}</span>
                </div>
              </td>
              <td>{school.awards.first}</td>
              <td>{school.awards.second}</td>
              <td>{school.awards.third}</td>
              <td>{school.total}</td>
              <td>{school.points}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="h-32 w-full flex flex-col items-center justify-center">
        <p className="text-center italic font-light">
          "Un Esfuerzo Total, Es una Victoria Completa. Formando Campeones Para
          La Vida"
        </p>
      </div>
    </div>
  );
}
