# admin-panel
Features
Student Management: View and edit student details such as ID, Name, Grade Level, Admission Status, Previous School, etc.

Search Functionality: Quickly search for students by ID, First Name, or Last Name.

Filtering: Filter students by Grade Level and Admission Status.

Editable Fields: Update student information (such as the 'Previous School' field) dynamically with real-time updates.

Responsive Design: Fully responsive UI that adapts seamlessly to various screen sizes (mobile, tablet, desktop).

Role-Based Access Control: Secure admin access with JWT-based authentication.

Tech Stack
Frontend:

Next.js: A React framework for building optimized, full-stack applications.

React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for custom designs.

Shadcn UI: A UI component library built on top of Tailwind CSS for a consistent and elegant UI design.

Backend:

NestJS: A framework for building scalable and maintainable server-side applications.

PostgreSQL: A powerful relational database for storing student records.

Axios: A promise-based HTTP client for making API requests.

Authentication:

JWT (JSON Web Tokens): For secure authentication and authorization of admin users.

Installation
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 16+ recommended)

Yarn (optional but recommended)

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/student-management-dashboard.git
cd student-management-dashboard
2. Install Dependencies
Using npm:

bash
Copy
Edit
npm install
Or using Yarn:

bash
Copy
Edit
yarn install
3. Set Up the Backend (NestJS + PostgreSQL)
Ensure that you have PostgreSQL running and create a new database. Then, update the backend .env file with your PostgreSQL credentials:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=student_management
JWT_SECRET=your-jwt-secret-key
Run the backend server:

bash
Copy
Edit
npm run start:dev
4. Run the Frontend (Next.js)
Once the backend is set up, run the frontend with:

bash
Copy
Edit
npm run dev
This will start the Next.js application at http://localhost:3000.

Usage
Student Dashboard
View Student Information: The main dashboard displays a table of all students with columns for ID, First Name, Last Name, Grade Level, Admission Status, Last Update, and Notes.

Search & Filter: Use the search bar to find students by ID, First Name, or Last Name. The filters allow you to narrow down the results by Grade Level and Admission Status.

Edit Student Data: Click on the "Previous School" field to update student information. The changes will automatically be reflected in the table after being saved to the backend.

Add New Student: Use the "Add New Student" button to navigate to the page for adding a new student.

API Endpoints
1. GET /students
Fetches all students from the database.

Response:

json
Copy
Edit
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "gradeLevel": "10",
    "admissionStatus": "Submitted",
    "previousSchool": "XYZ High School",
    "lastUpdate": "2025-04-26T10:00:00Z"
  },
  ...
]
2. PUT /students/:id
Updates a student's information based on the student ID.

Request Body:

json
Copy
Edit
{
  "previousSchool": "New School Name"
}
Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Student record updated successfully"
}
3. POST /students
Creates a new student record.

Request Body:

json
Copy
Edit
{
  "firstName": "Jane",
  "lastName": "Doe",
  "gradeLevel": "9",
  "admissionStatus": "Pending",
  "previousSchool": "ABC High School"
}
Response:

json
Copy
Edit
{
  "id": 3,
  "firstName": "Jane",
  "lastName": "Doe",
  "gradeLevel": "9",
  "admissionStatus": "Pending",
  "previousSchool": "ABC High School",
  "lastUpdate": "2025-04-27T09:00:00Z"
}
4. DELETE /students/:id
Deletes a student record.

Response:

json
Copy
Edit
{
  "status": "success",
  "message": "Student record deleted successfully"
}
