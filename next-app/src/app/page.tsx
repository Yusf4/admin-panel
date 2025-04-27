'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './components/StudentTable';

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gradeLevel: '',
    previousSchool: '',
    admissionStatus: '',
    lastUpdate: '',
    notes: '',
  });

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      const data = res.data;
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  // Call the fetchStudents function when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle creating a new student
  const handleCreateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (!res.ok) {
        throw new Error('Failed to create student');
      }

      const createdStudent = await res.json();
      setStudents((prev) => [...prev, createdStudent]);

      // Reset the form
      setNewStudent({
        firstName: '',
        lastName: '',
        gradeLevel: '',
        previousSchool: '',
        admissionStatus: '',
        lastUpdate: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  // Handle updating the previous school dynamically
  const handlePreviousSchoolChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    studentId: number
  ) => {
    const updatedPreviousSchool = e.target.value;

    // Update the student data in the backend
    try {
      const res = await axios.put(`http://localhost:3000/students/${studentId}`, {
        previousSchool: updatedPreviousSchool,
      });

      if (res.status === 200) {
        // Update the state with the new student data
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId
              ? { ...student, previousSchool: updatedPreviousSchool }
              : student
          )
        );
      }
    } catch (error) {
      console.error('Error updating previous school:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Student Management Dashboard
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID, First Name, Last Name"
          className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add New Student Form */}
      <form onSubmit={handleCreateStudent} className="space-y-6 bg-white p-8 rounded-md shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Student</h2>

        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Grade Level"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.gradeLevel}
            onChange={(e) => setNewStudent({ ...newStudent, gradeLevel: e.target.value })}
          />
          <input
            type="text"
            placeholder="Previous School"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.previousSchool}
            onChange={(e) => setNewStudent({ ...newStudent, previousSchool: e.target.value })}
          />
          <input
            type="text"
            placeholder="Admission Status"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.admissionStatus}
            onChange={(e) => setNewStudent({ ...newStudent, admissionStatus: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Update"
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.lastUpdate}
            onChange={(e) => setNewStudent({ ...newStudent, lastUpdate: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Notes"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={newStudent.notes}
            onChange={(e) => setNewStudent({ ...newStudent, notes: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Student
        </button>
      </form>

      {/* Student Table */}
      <StudentTable
        students={students}
        searchQuery={searchQuery}
        setStudents={setStudents}
        handlePreviousSchoolChange={handlePreviousSchoolChange} // Pass the function to the table
      />
    </div>
  );
};

export default StudentsPage;
