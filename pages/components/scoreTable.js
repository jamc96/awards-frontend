import classNames from "classnames";
import { useState } from "react";
import Image from "./shared/image";
const ScoreTable = ({ schools }) => {
  const [selectedRow, setSelectedRow] = useState(schools[0].id);

  return (
    <div className="w-full h-96 overflow-y-auto">
      <table className="w-full max-w-4xl mx-auto">
        <tbody>
          <tr className=" text-left text-sm border-b border-gray-700 md:text-lg">
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
              className={classNames("font-extralight cursor-pointer text-lg md:text-xl", {
                "bg-red-400 rounded-lg": school.id === selectedRow,
              })}
              onClick={() => setSelectedRow(school.id)}
            >
              <td className="px-2">{index + 1}</td>
              <td>
                <div className="py-2 w-24 flex flex-row items-center gap-x-2 sm:w-full">
                  <div className="bg-gray-300 h-6 w-6 rounded-full">
                    <Image {...school.image} className="w-full h-full object-cover" />
                  </div>

                  <span className="sm:hidden" suppressHydrationWarning={true}>{school.code}</span>
                  <span className="hidden sm:block" suppressHydrationWarning={true}>{school.name}</span>
                </div>
              </td>
              <td>{school.awards.first}</td>
              <td>{school.awards.second}</td>
              <td>{school.awards.third}</td>
              <td>{school.total}</td>
              <td>{school.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
