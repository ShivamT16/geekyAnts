import { useEffect, useState } from 'react';
import { getEngineers, getProjects, getAssignments } from '../api';
import AssignForm from './AssignForm';
import CreateProject from './CreateProject';
import EngineerSearch from './EngineerSearch';

export default function Dashboard() {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [eng, proj, assign] = await Promise.all([
      getEngineers(),
      getProjects(),
      getAssignments(),
    ]);
    setEngineers(eng);
    setProjects(proj);
    setAssignments(assign);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/assignments/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAssignments(prev => prev.filter(a => a._id !== id));
      } else {
        console.error('Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  return (
    <>
      <EngineerSearch />
      <div className="flex flex-wrap justify-center m-4">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Engineers</h2>
            <ul className="space-y-1">
              {engineers.map((e) => (
                <li key={e._id} className="border p-2 rounded">
                  {e.name} – {e.skills.join(', ')} ({e.maxCapacity}%)
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <ul className="space-y-1">
              {projects.map((p) => (
                <li key={p._id} className="border p-2 rounded">
                  {p.name} – {p.status} – Team size: {p.teamSize}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Assignments</h2>
            <ul className="space-y-1">
              {assignments.map((a) => (
                <li key={a._id} className="border p-2 rounded flex justify-between items-center">
                  <div>
                    Engineer: {a.engineerId?.name || '—'}, Project: {a.projectId?.name || '—'}, Alloc: {a.allocationPercentage}%
                  </div>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <AssignForm />
      </div>
      <CreateProject />
    </>
  );
}
