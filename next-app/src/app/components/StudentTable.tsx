import React, { useState } from 'react';
import axios from 'axios';

const StudentTable = ({ students, searchQuery, setStudents }) => {
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editedPreviousSchool, setEditedPreviousSchool] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Predefined admission status options
  const admissionStatuses = ['Submitted', 'Approved', 'Pending', 'Rescheduled'];

  // Function to handle updating the Previous School field
  const handlePreviousSchoolChange = async (id: number, newPreviousSchool: string) => {
    try {
      // Make an API call to update the 'previousSchool' in the database
      const res = await axios.put(`http://localhost:3000/students/${id}`, {
        previousSchool: newPreviousSchool,
      });

      // After successfully updating, update the state to reflect the change
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, previousSchool: newPreviousSchool } : student
        )
      );
    } catch (error) {
      setError('Error updating student.');
      console.error('Error updating student:', error);
    }
  };

  // Function to handle updating the Admission Status field
  const handleAdmissionStatusChange = async (id: number, newStatus: string) => {
    try {
      // Make an API call to update the 'admissionStatus' in the database
      const res = await axios.put(`http://localhost:3000/students/${id}`, {
        admissionStatus: newStatus,
      });

      // After successfully updating, update the state to reflect the change
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, admissionStatus: newStatus } : student
        )
      );
    } catch (error) {
      setError('Error updating admission status.');
      console.error('Error updating admission status:', error);
    }
  };

  // Handle the edit button click for Previous School field
  const handleEditClick = (studentId: number, currentPreviousSchool: string) => {
    setEditingStudentId(studentId);
    setEditedPreviousSchool(currentPreviousSchool);
  };

  const handleChangePreviousSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPreviousSchool(e.target.value);
  };

  const handleBlur = async (studentId: number) => {
    if (editedPreviousSchool !== '') {
      await handlePreviousSchoolChange(studentId, editedPreviousSchool);
    }
    setEditingStudentId(null);
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          {error}
        </div>
      )}
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-3 px-4 text-left">Student ID</th>
            <th className="py-3 px-4 text-left">First Name</th>
            <th className="py-3 px-4 text-left">Last Name</th>
            <th className="py-3 px-4 text-left">Grade Level</th>
            <th className="py-3 px-4 text-left">Previous School</th>
            <th className="py-3 px-4 text-left">Phase</th>
            <th className="py-3 px-4 text-left">Last Update</th>
            <th className="py-3 px-4 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) => {
              return (
                student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.id.toString().includes(searchQuery)
              );
            })
            .map((student) => (
              <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.firstName}</td>
                <td className="py-3 px-4">{student.lastName}</td>
                <td className="py-3 px-4">{student.gradeLevel}</td>
                <td className="py-3 px-4">
                  {editingStudentId === student.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      value={editedPreviousSchool}
                      onChange={handleChangePreviousSchool}
                      onBlur={() => handleBlur(student.id)}
                    />
                  ) : (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEditClick(student.id, student.previousSchool)}
                    >
                      {student.previousSchool}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={student.admissionStatus}
                    onChange={(e) => handleAdmissionStatusChange(student.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    {admissionStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">{student.lastUpdate}</td>
                <td className="py-3 px-4">{student.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
