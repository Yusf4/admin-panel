// components/StudentTable.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  gradeLevel: number;
  previousSchool: string;
  admissionStatus: string;
  lastUpdate: string;
  notes: string;
}

interface StudentTableProps {
  students: Student[];
  searchQuery: string;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, searchQuery, setStudents }) => {
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editedPreviousSchool, setEditedPreviousSchool] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Static list of statuses
  const admissionStatuses = ['Submitted', 'Approved', 'Pending', 'Rescheduled'];

  // Update Previous School
  const handlePreviousSchoolChange = async (id: number, newValue: string) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, { previousSchool: newValue });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, previousSchool: newValue } : s))
      );
    } catch {
      setError('Error updating previous school.');
    }
  };

  // Update Admission Status
  const handleAdmissionStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, { admissionStatus: newStatus });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, admissionStatus: newStatus } : s))
      );
    } catch {
      setError('Error updating admission status.');
    }
  };

  // Inline edit handlers
  const startEditing = (id: number, current: string) => {
    setEditingStudentId(id);
    setEditedPreviousSchool(current);
  };
  const onPrevChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPreviousSchool(e.target.value);
  };
  const onPrevBlur = async (id: number) => {
    if (editedPreviousSchool) await handlePreviousSchoolChange(id, editedPreviousSchool);
    setEditingStudentId(null);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'font-bold text-gray-500 bg-gray-200 rounded px-2 py-1';
      case 'Approved':
        return 'font-bold text-blue-500 bg-blue-100 rounded px-2 py-1';
      case 'Pending':
        return 'font-bold text-red-500 bg-red-100 rounded px-2 py-1';
      case 'Rescheduled':
        return 'font-bold text-yellow-400 bg-yellow-100 rounded px-2 py-1';
      default:
        return 'font-bold text-black bg-gray-100 rounded px-2 py-1';
    }
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
          <tr className="bg-blue-100">
            {['ID','First Name','Last Name','Grade','Previous School','Admission Status','Last Update','Notes'].map((h) => (
              <th key={h} className="px-4 py-2 font-bold text-black text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students
            .filter((s) =>
              s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.id.toString().includes(searchQuery)
            )
            .map((student) => (
              <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2">{student.firstName}</td>
                <td className="px-4 py-2">{student.lastName}</td>
                <td className="px-4 py-2">{student.gradeLevel}</td>
                <td className="px-4 py-2">
                  {editingStudentId === student.id ? (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedPreviousSchool}
                      onChange={onPrevChange}
                      onBlur={() => onPrevBlur(student.id)}
                    />
                  ) : (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => startEditing(student.id, student.previousSchool)}
                    >
                      {student.previousSchool}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                <select
  value={student.admissionStatus}
  onChange={(e) =>
    handleAdmissionStatusChange(student.id, e.target.value)
  }
  className={
    `w-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ` +
    getStatusClasses(student.admissionStatus)
  }
>
  {admissionStatuses.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>

                </td>
                <td className="px-4 py-2">{student.lastUpdate}</td>
                <td className="px-4 py-2">{student.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
