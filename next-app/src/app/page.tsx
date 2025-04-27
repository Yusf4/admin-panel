'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './components/StudentTable';
import { Button } from './components/ui/button'; // assuming you use Shadcn UI button
import Link from 'next/link'; // for navigating to the add-student page

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('');
  const [selectedAdmissionStatus, setSelectedAdmissionStatus] = useState('');  // Renamed to 'selectedAdmissionStatus'
  const [gradeLevels, setGradeLevels] = useState<string[]>([]); // Store unique grade levels as strings


  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      const data = res.data;
      setStudents(data);
  
      // Log the admissionStatus of each student to ensure "Submitted" exists
      data.forEach(student => {
        console.log(`Student ID: ${student.id}, Admission Status: ${student.admissionStatus}`);
      });
  
      // Extract unique grade levels from the fetched data
      const uniqueGradeLevels = Array.from(new Set(data.map((student: any) => student.gradeLevel)));
      setGradeLevels(uniqueGradeLevels.map(String)); // Store them as strings in the state
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };
  // Fetch students from the API
 /* const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      const data = res.data;
      setStudents(data);


      // Extract unique grade levels from the fetched data
      const uniqueGradeLevels = Array.from(new Set(data.map((student: any) => student.gradeLevel)));
      setGradeLevels(uniqueGradeLevels.map(String)); // Store them as strings in the state
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };
*/
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle updating the previous school dynamically
  const handlePreviousSchoolChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    studentId: number
  ) => {
    const updatedPreviousSchool = e.target.value;

    try {
      const res = await axios.put(`http://localhost:3000/students/${studentId}`, {
        previousSchool: updatedPreviousSchool,
      });

      if (res.status === 200) {
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

  // Filter students based on searchQuery, selectedGradeLevel, and selectedAdmissionStatus
  const filteredStudents = students.filter((student) => {
    // Filter by search query (ID, first name, or last name)
    const matchesSearchQuery =
      student.id.toString().includes(searchQuery) ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected grade level (ensure both values are strings for comparison)
    const matchesGradeLevel = selectedGradeLevel
      ? student.gradeLevel.toString() === selectedGradeLevel
      : true;

    // Filter by selected admission status (formerly 'phase')
    const matchesAdmissionStatus = selectedAdmissionStatus
      ? student.admissionStatus && student.admissionStatus.toLowerCase() === selectedAdmissionStatus.toLowerCase()
      : true;

    // Return true only if all filters match
    return matchesSearchQuery && matchesGradeLevel && matchesAdmissionStatus;
  });

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Student Management Dashboard
      </h1>

      {/* Button to navigate to Add Student Page */}
      <div className="flex justify-end mb-6">
        <Link href="/students/add">
          <Button>Add New Student</Button>
        </Link>
      </div>

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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Grade Level Filter */}
        <select
          value={selectedGradeLevel}
          onChange={(e) => setSelectedGradeLevel(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Grade Levels</option>
          {/* Dynamically generate grade level options */}
          {gradeLevels.map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>

        {/* Admission Status Filter (formerly Phase) */}
        <select
          value={selectedAdmissionStatus}
          onChange={(e) => setSelectedAdmissionStatus(e.target.value)}  // Update selectedAdmissionStatus based on the dropdown
          className="p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Admission Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rescheduled">Rescheduled</option>
        </select>
      </div>

      {/* Student Table */}
      <StudentTable
        students={filteredStudents} // Pass filtered students to the table
        searchQuery={searchQuery}
        selectedGradeLevel={selectedGradeLevel}
        selectedAdmissionStatus={selectedAdmissionStatus}  // Pass selectedAdmissionStatus to the table if needed
        setStudents={setStudents}
        handlePreviousSchoolChange={handlePreviousSchoolChange}
      />
    </div>
  );
};

export default StudentsPage;
