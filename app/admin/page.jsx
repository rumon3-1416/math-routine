'use client';

import React, { useEffect, useState } from 'react';
import RoutineGrid from '@/components/RoutineGrid';
import AdminCellEditor from '@/components/AdminCellEditor';

export default function AdminPage() {
  const [routines, setRoutines] = useState([]);
  const [active, setActive] = useState(null);
  const [editor, setEditor] = useState({
    visible: false,
    day: null,
    periodIndex: null,
    cell: null,
  });

  // Load routines initially
  useEffect(() => {
    fetch('/api/routines')
      .then(r => r.json())
      .then(setRoutines);
  }, []);

  // --- Create Default Routine ---
  async function createDefault() {
    const defaultRoutine = {
      title: 'Math Class Routine',
      daysOrder: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      periods: [
        { label: '1st Period', time: '09:00-09:50' },
        { label: '2nd Period', time: '09:50-10:40' },
        { label: '3rd Period', time: '10:40-11:30' },
        { label: '4th Period', time: '11:30-12:20' },
        { label: '5th Period', time: '12:20-01:10' },
        { label: 'Break', time: '01:10-01:40' },
        { label: '6th Period', time: '01:40-02:30' },
      ],
      cells: [],
    };

    const res = await fetch('/api/routines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultRoutine),
    });

    const data = await res.json();
    setRoutines(prev => [...prev, data]); // <-- THIS WAS MISSING
  }

  // --- Open editor modal ---
  function openEditor(day, periodIndex, cell) {
    setEditor({
      visible: true,
      day,
      periodIndex,
      cell,
    });
  }

  // --- Save updated cell ---
  async function saveCell(updatedCell) {
    if (!active) return;

    const res = await fetch(`/api/routines?id=${active._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCell),
    });

    const updatedRoutine = await res.json();

    // replace routine in list
    setRoutines(
      routines.map(r => (r._id === updatedRoutine._id ? updatedRoutine : r))
    );

    setEditor({ visible: false, day: null, periodIndex: null, cell: null });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {/* Create default routine button */}
      <button
        onClick={createDefault}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Default Routine
      </button>

      {/* Routine selection */}
      <div className="mt-4">
        {routines.map(r => (
          <button
            key={r._id}
            onClick={() => setActive(r)}
            className={`px-3 py-1 rounded mr-2 ${
              active?._id === r._id ? 'bg-green-600 text-white' : 'bg-gray-300'
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      {/* Active routine grid */}
      {active && (
        <RoutineGrid
          routine={active}
          adminMode={true}
          onCellClick={openEditor}
        />
      )}

      {/* Editor modal */}
      {editor.visible && (
        <AdminCellEditor
          visible={editor.visible}
          cellData={editor}
          onClose={() => setEditor({ visible: false })}
          onSave={saveCell}
        />
      )}
    </div>
  );
}
