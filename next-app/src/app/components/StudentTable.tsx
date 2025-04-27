import React from 'react';

const StudentTable = ({ students, searchQuery, setStudents }: any) => {
  const filteredStudents = students.filter(
    (student: any) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery)
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Student ID</th>
            <th className="py-3 px-6 text-left">First Name</th>
            <th className="py-3 px-6 text-left">Last Name</th>
            <th className="py-3 px-6 text-left">Grade Level</th>
            <th className="py-3 px-6 text-left">Previous School</th>
            <th className="py-3 px-6 text-left">Admission Status</th>
            <th className="py-3 px-6 text-left">Last Update</th>
            <th className="py-3 px-6 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            filteredStudents.map((student: any) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-800">{student.id}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{student.firstName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{student.lastName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{student.gradeLevel}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{student.previousSchool}</td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  <select
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={student.admissionStatus}
                    onChange={(e) => {
                      const updatedStudent = { ...student, admissionStatus: e.target.value };
                      setStudents((prevStudents: any) =>
                        prevStudents.map((s: any) =>
                          s.id === student.id ? updatedStudent : s
                        )
                      );
                    }}
                  >
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Rescheduled</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">{student.lastUpdate}</td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={student.notes}
                    onChange={(e) => {
                      const updatedStudent = { ...student, notes: e.target.value };
                      setStudents((prevStudents: any) =>
                        prevStudents.map((s: any) =>
                          s.id === student.id ? updatedStudent : s
                        )
                      );
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
