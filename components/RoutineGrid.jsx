'use client';

import React from 'react';

const RoutineGrid = ({ routine, onCellClick }) => {
  if (!routine) return <div>No routine loaded</div>;
  const days = routine.daysOrder;
  const periods = routine.periods;

  const cellMap = {};
  (routine.cells || []).forEach(c => {
    cellMap[`${c.day}-${c.periodIndex}`] = c;
  });

  return (
    <div className="p-4">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `160px repeat(${periods.length}, minmax(120px,1fr))`,
          gap: '12px',
        }}
      >
        <div />
        {periods.map((p, i) => (
          <div
            key={i}
            className="rounded-lg bg-violet-400 text-white p-3 text-center shadow"
          >
            <div className="font-semibold">{p.label}</div>
            <div className="text-xs mt-1">{p.time}</div>
          </div>
        ))}

        {days.map(day => (
          <React.Fragment key={day}>
            <div className="rounded-lg bg-pink-300 text-white p-4 flex items-center justify-center font-bold shadow">
              {day}
            </div>
            {periods.map((_, idx) => {
              const key = `${day}-${idx}`;
              const cell = cellMap[key];
              return (
                <div
                  key={key}
                  onClick={() =>
                    onCellClick && onCellClick({ day, periodIndex: idx, cell })
                  }
                >
                  <div
                    className="h-28 rounded-lg shadow-inner flex items-center justify-center text-center px-2"
                    style={{ backgroundColor: cell?.color || '#bfe0f2' }}
                  >
                    <div>
                      <div className="font-semibold">{cell?.subject || ''}</div>
                      {cell?.teacher && (
                        <div className="text-xs mt-1">{cell.teacher}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RoutineGrid;
