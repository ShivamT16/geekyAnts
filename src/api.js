const API_BASE = 'http://localhost:5000/api';

export async function getEngineers() {
  const res = await fetch(`${API_BASE}/users/engineers`);
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function getAssignments() {
  const res = await fetch(`${API_BASE}/assignments`);
  return res.json();
}
