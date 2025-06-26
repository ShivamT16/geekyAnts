import { useState } from 'react';

export default function EngineerSearch() {
  const [skill, setSkill] = useState('');
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!skill.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/engineers?skill=${encodeURIComponent(skill)}`);
      const data = await res.json();
      setEngineers(data);
    } catch (err) {
      console.error('Failed to fetch engineers', err);
    }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter skill (e.g. React)"
          value={skill}
          onChange={e => setSkill(e.target.value)}
          className="border px-3 py-2 rounded mr-2 w-64"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && engineers.length === 0 && <p>No engineers found for "{skill}"</p>}

      {engineers.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Engineers with skill "{skill}"</h2>
          <ul>
            {engineers.map(e => (
              <li key={e._id} className="border p-3 rounded mb-2">
                <p><strong>{e.name}</strong> ({e.seniority})</p>
                <p>Skills: {e.skills.join(', ')}</p>
                <p>Department: {e.department}</p>
                <p>Available Capacity: {e.availableCapacity}%</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}