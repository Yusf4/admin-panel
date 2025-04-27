'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './components/ui/button';
import StudentTable from './components/StudentTable';
import Link from 'next/link';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'; // ✅ corrected path

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('');
  const [selectedAdmissionStatus, setSelectedAdmissionStatus] = useState('');
  const [gradeLevels, setGradeLevels] = useState<string[]>([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      const data = res.data;
      setStudents(data);

      const uniqueGradeLevels = Array.from(new Set(data.map((student: any) => student.gradeLevel)));
      setGradeLevels(uniqueGradeLevels.map(String));
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearchQuery =
      student.id.toString().includes(searchQuery) ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGradeLevel = selectedGradeLevel
      ? student.gradeLevel.toString() === selectedGradeLevel
      : true;

    const matchesAdmissionStatus = selectedAdmissionStatus
      ? student.admissionStatus && student.admissionStatus.toLowerCase() === selectedAdmissionStatus.toLowerCase()
      : true;

    return matchesSearchQuery && matchesGradeLevel && matchesAdmissionStatus;
  });

  const statusCounts = students.reduce((acc, student) => {
    const status = student.admissionStatus || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = [
    { name: 'Approved', value: statusCounts['Approved'] || 0, color: '#3B82F6' }, // Blue
    { name: 'Pending', value: statusCounts['Pending'] || 0, color: '#EF4444' },  // Red
    { name: 'Rescheduled', value: statusCounts['Rescheduled'] || 0, color: '#F59E0B' }, // Yellow
    { name: 'Submitted', value: statusCounts['Submitted'] || 0, color: '#6B7280' }, // Gray
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Student Management Dashboard
      </h1>

      {/* Button to Add Student */}
      <div className="flex justify-end mb-6">
        <Link href="/students/add">
          <Button>Add New Student</Button>
        </Link>
      </div>

      {/* PIE CHART - Admin Status Overview */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Admission Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

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
        <select
          value={selectedGradeLevel}
          onChange={(e) => setSelectedGradeLevel(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Grade Levels</option>
          {gradeLevels.map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>

        <select
          value={selectedAdmissionStatus}
          onChange={(e) => setSelectedAdmissionStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Admission Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rescheduled">Rescheduled</option>
        </select>
      </div>

      {/* Header for total students */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Total Students: {filteredStudents.length}</h2>
        <div className="text-gray-500 text-sm">Showing {filteredStudents.length} students</div>
      </div>

      {/* Student Table */}
      <StudentTable
        students={filteredStudents}
        searchQuery={searchQuery}
        selectedGradeLevel={selectedGradeLevel}
        selectedAdmissionStatus={selectedAdmissionStatus}
        setStudents={setStudents}
      />
    </div>
  );
};

export default StudentsPage;
