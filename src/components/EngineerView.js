import { useEffect, useState } from 'react';

export default function EngineerView({ user }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      const res = await fetch(`http://localhost:5000/api/assignments/engineer/${user._id}`);
      const data = await res.json();
      setAssignments(
        data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      );
    }
    fetchAssignments();
  }, [user]);

  const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
  const available = user.maxCapacity - totalAllocated;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Assignments</h1>

      <div className="mb-4">
        <p className="text-gray-700">
          🧠 <strong>Total Allocated:</strong> {totalAllocated}% &nbsp;|&nbsp;
          🟢 <strong>Available:</strong> {available}%
        </p>
      </div>

      {assignments.map((a) => (
        <div key={a._id} className="border p-3 rounded mb-2 bg-white shadow-sm">
          <p>📁 Project: <strong>{a.projectId?.name || '—'}</strong></p>
          <p>🔧 Role: {a.role}</p>
          <p>🗓 Duration: {new Date(a.startDate).toLocaleDateString()} → {new Date(a.endDate).toLocaleDateString()}</p>
          <p>⚡ Allocation: {a.allocationPercentage}%</p>
        </div>
      ))}
    </div>
  );
}
