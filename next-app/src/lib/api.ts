// src/lib/api.ts

export async function fetchStudents() {
    const res = await fetch('/api/students');
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
  }
  
  export async function deleteStudent(id: number) {
    const res = await fetch(`/api/students?id=${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete student');
    return res.json();
  }
  
  export async function updateStudent(id: number, updatedData: any) {
    const res = await fetch(`/api/students?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('Failed to update student');
    return res.json();
  }
  