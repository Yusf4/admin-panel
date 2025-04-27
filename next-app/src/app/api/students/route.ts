import { NextResponse } from 'next/server';

// Sample data for students (replace this with database calls in a real application)
let students = [
  { id: 1, firstName: 'John', lastName: 'Doe', gradeLevel: '10', previousSchool: 'ABC School', admissionStatus: 'Approved', lastUpdate: '2025-04-20', notes: 'Needs special attention' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', gradeLevel: '11', previousSchool: 'XYZ School', admissionStatus: 'Submitted', lastUpdate: '2025-04-22', notes: 'Excellent student' },
];

// GET - Fetch all students
export async function GET() {
  return NextResponse.json(students);
}

// POST - Create a new student
export async function POST(request: Request) {
  const newStudent = await request.json();
  const newStudentId = students.length + 1;
  const studentWithId = { id: newStudentId, ...newStudent };
  students.push(studentWithId);
  return NextResponse.json(studentWithId, { status: 201 });
}

// PUT - Update an existing student
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Student ID is required' }, { status: 400 });
  }

  const updatedData = await request.json();
  const studentIndex = students.findIndex(student => student.id === parseInt(id));

  if (studentIndex === -1) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }

  students[studentIndex] = { ...students[studentIndex], ...updatedData };
  return NextResponse.json(students[studentIndex]);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Student ID is required' }, { status: 400 });
  }

  students = students.filter(student => student.id !== parseInt(id));
  return NextResponse.json({ message: 'Student deleted' });
}
