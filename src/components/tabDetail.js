import React, { useState } from "react";
import { Icon } from "@iconify/react";
import base from "helpers/base";

function TabDetail({ data }) {
  const [tabActive, setTabActive] = useState(0);

  return (
    <React.Fragment>
      <div className="grid grid-cols-3 mt-2">
        <button
          className={`tab-detail ${tabActive === 0 ? 'active' : ''}`}
          onClick={() => setTabActive(0)}
        >
          Info
        </button>
        <button
          className={`tab-detail ${tabActive === 1 ? 'active' : ''}`}
          onClick={event => setTabActive(1)}
        >
          Stat
        </button>
        <button
          className={`tab-detail ${tabActive === 2 ? 'active' : ''}`}
          onClick={event => setTabActive(2)}
        >
          Moves
        </button>
      </div>
      <div className={`${tabActive === 0 ? 'block' : 'hidden'} py-2`}>
        <div className="text-sm md:text-base text-gray-600">
          <div className="flex flex-row">
            <div className="w-32 py-1">Height</div>
            <div className="w-full py-1 font-medium text-cyan-700">
              {`${data.height}' (${base.toCm(data.height)} cm)`}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-32 py-1">Weight</div>
            <div className="w-full py-1 font-medium text-cyan-700">
              {`${data.weight} lbs (${base.toKg(data.weight)} kg)`}
            </div>
          </div>

          <div className="text-sm md:text-base mt-2">
            <h4 className="font-semibold text-cyan-700">Abilities</h4>
            {data.abilities.map((obj, key) => 
              <div className="py-1.5 flex flex-row" key={key}>
                <div className="text-cyan-700 text-3xl mr-1">
                  <Icon icon="ci:radio-filled" />
                </div>
                <div>
                  <p className="uppercase text-xs tracking-wide">{base.formatText(obj.ability.name)}</p>
                  <p>{obj.ability.descriptions[0].text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`${tabActive === 1 ? 'block' : 'hidden'} py-2`}>
        <table className="text-sm md:text-base text-gray-600">
          <tbody>
          {data.stats.map((obj, key) => 
            <tr
              key={key}
            >
              <td className="whitespace-nowrap">
                {base.formatText(obj.stat.name)}
              </td>
              <td className="w-full px-1 md:px-2">
                <div className="w-full h-1 relative top-0.5 bg-slate-300" />
                <div
                  className="h-1 relative bottom-0.5"
                  style={{
                    width: `${base.persenStat(obj.stat.base_stat[0].value, data.stats)}%`,
                    backgroundColor: base.colorStat(obj.stat.base_stat[0].value)
                  }}
                />
              </td>
              <td>
                {obj.stat.base_stat[0].value}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <div className={`${tabActive === 2 ? 'block' : 'hidden'} py-2`}>
        <ul>
        {data.moves.map((obj, key) => 
          <li className="flex flex-row items-center py-1" key={key}>
            <div className="text-cyan-700 text-2xl mr-2">
              <Icon icon="fa-solid:running" />
            </div>
            <div>
              <h4 className="capitalize tracking-wide text-sm md:text-base font-medium">{base.formatText(obj.move.name)}</h4>
              <p className="text-xs md:text-sm text-gray-500">
                Accuracy <span className="font-semibold text-cyan-700">{obj.move.accuracy ? obj.move.accuracy : 'unknown'}</span>
              </p>
            </div>
          </li>
        )}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default TabDetail;