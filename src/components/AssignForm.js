import { useEffect, useState } from 'react';
import { getEngineers, getProjects } from '../api';

export default function AssignForm() {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    engineerId: '',
    projectId: '',
    allocationPercentage: 50,
    role: 'Developer',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    (async () => {
      const eng = await getEngineers();
      const proj = await getProjects();
      setEngineers(eng);
      setProjects(proj);
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('✅ Assignment created!');
      setForm({
        engineerId: '',
        projectId: '',
        allocationPercentage: 50,
        role: 'Developer',
        startDate: '',
        endDate: '',
      });
    } else {
      alert('❌ Error creating assignment');
    }
  };

  return (
    <div className="max-w-md p-4 border rounded bg-white shadow ">
      <h2 className="text-xl font-semibold mb-4">Assign Engineer to Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="engineerId" value={form.engineerId} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Engineer</option>
          {engineers.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>

        <select name="projectId" value={form.projectId} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="allocationPercentage"
          value={form.allocationPercentage}
          onChange={handleChange}
          min="0"
          max="100"
          placeholder="Allocation %"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role (e.g., Developer)"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Assign
        </button>
      </form>
    </div>
  );
}
