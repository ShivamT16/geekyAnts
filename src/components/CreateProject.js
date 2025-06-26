import { useState } from 'react';

export default function CreateProject({ managerId }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    teamSize: '',
    requiredSkills: '',
    status: 'planning',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()),
        managerId,
      }),
    });

    if (res.ok) {
      alert('✅ Project created!');
      setForm({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        teamSize: '',
        requiredSkills: '',
        status: 'planning',
      });
    } else {
      alert('❌ Failed to create project');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="teamSize" placeholder="Team Size" value={form.teamSize} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="requiredSkills" placeholder="Skills (comma-separated)" value={form.requiredSkills} onChange={handleChange} className="w-full border p-2 rounded" required />
        <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Project</button>
      </form>
    </div>
  );
}
