'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const AddStudentPage = () => {
  const router = useRouter();
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gradeLevel: '',
    previousSchool: '',
    admissionStatus: '',
    lastUpdate: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Reset error message on each submission

    try {
      const res = await axios.post('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (!res.ok) {
        throw new Error('Failed to create student');
      }

      await res.json();
      router.push('/students'); // Redirect back to students page after adding
    } catch (error) {
      setErrorMessage('Error creating student. Please try again.');
      console.error('Error creating student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Add New Student</h1>

      <form onSubmit={handleCreateStudent} className="space-y-6 bg-white p-8 rounded-md shadow-lg">
        {/* Form Inputs */}
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
          <select
            className="p-3 border border-gray-300 rounded-md"
            value={newStudent.admissionStatus}
            onChange={(e) => setNewStudent({ ...newStudent, admissionStatus: e.target.value })}
          >
            <option value="">Select Admission Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
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

        {/* Error Message */}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? 'cursor-wait' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
