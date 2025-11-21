'use client';

import React, { useState, useEffect } from 'react';

const AdminCellEditor = ({ visible, onClose, cellData, onSave }) => {
  const [form, setForm] = useState({
    subject: cellData.subject || '',
    teacher: cellData.teacher || '',
    color: cellData.color || '#bfe0f2',
  });

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-3">Edit Cell</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm">Subject</label>
            <input
              className="w-full border p-2 rounded"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">Teacher</label>
            <input
              className="w-full border p-2 rounded"
              value={form.teacher}
              onChange={e => setForm({ ...form, teacher: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm">Color</label>
            <input
              type="color"
              value={form.color}
              onChange={e => setForm({ ...form, color: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCellEditor;
