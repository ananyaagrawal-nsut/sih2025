// database.js

// --- MASTER DATA & CONFIGURATION ---
const BRANCHES = {
    "CS": {
        name: "Computer Science",
        courses: { "CS101": "Data Structures", "CS102": "Operating Systems", "CS201": "Database Management", "AL301": "Intro to Algorithms", "AI401": "Machine Learning" }
    },
    "ME": {
        name: "Mechanical Engineering",
        courses: { "ME101": "Thermodynamics", "ME102": "Fluid Mechanics", "ME201": "Machine Design", "ME301": "Heat Transfer", "ME401": "Robotics" }
    },
    "PH": {
        name: "Physics",
        courses: { "PH101": "Classical Mechanics", "PH102": "Electromagnetism", "PH201": "Thermodynamics", "PH301": "Quantum Mechanics", "PH401": "General Relativity" }
    }
};

const FACULTY_NAMES = [ 'Dr. Wilson', 'Dr. Sharma', 'Prof. Khanna', 'Prof. Lovelace', 'Dr. Torvalds', 'Prof. Codd', 'Dr. Hinton', 'Prof. Eiffel', 'Dr. Bernoulli', 'Prof. Lutyens', 'Dr. Boole', 'Prof. Marconi', 'Prof. Fourier', 'Dr. Mead', 'Prof. Berners-Lee', 'Dr. Rivest', 'Prof. Bezos', 'Dr. Royce', 'Prof. Shokhanda', 'Dr. Manish' ];
const FIRST_NAMES = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aadya", "Kiara", "Diya", "Pihu", "Ananya", "Fatima", "Pari", "Anika", "Navya", "Rohan", "Advik", "Kabir", "Aryan", "Dhruv", "Zoya", "Myra", "Shanaya", "Amaira", "Ira"];
const LAST_NAMES = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Yadav", "Patel", "Khan", "Malhotra", "Mehra", "Jain", "Reddy", "Chopra", "Das", "Rao"];
const ANNOUNCEMENTS = [ { id: 1, title: "Mid-Term Exams Schedule", date: "Sep 15, 2025", content: "The schedule for the upcoming mid-term examinations has been posted. Please check the notice board." }, { id: 2, title: "Tech Fest 'Innovate 2025'", date: "Sep 12, 2025", content: "Registrations for Innovate 2025 are now open. Participate in exciting coding and robotics events!" }, { id: 3, title: "Guest Lecture on Quantum Computing", date: "Sep 22, 2025", content: "A guest lecture by Dr. Anya Sharma from the National Research Institute is scheduled for Monday."} ];


// --- UTILITY FUNCTIONS ---
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const assignmentStatuses = ["Graded", "Submitted", "Pending"];


// --- STUDENT DATA GENERATION LOGIC ---
const generateAllStudentData = () => {
    const students = {};
    const currentYear = new Date().getFullYear().toString().slice(-2);

    for (const branchCode in BRANCHES) {
        const branch = BRANCHES[branchCode];
        const courseIds = Object.keys(branch.courses);

        for (let i = 1; i <= 50; i++) {
            const studentId = `${branchCode}${currentYear}${String(i).padStart(3, '0')}`;
            const firstName = getRandomElement(FIRST_NAMES);
            const lastName = getRandomElement(LAST_NAMES);
            const studentName = `${firstName} ${lastName}`;

            students[studentId] = {
                profile: {
                    id: studentId,
                    name: studentName,
                    password: 'password123',
                    role: 'student',
                    department: branch.name,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@university.edu`,
                    phone: `+91 98765 ${getRandomInt(10000, 99999)}`,
                    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(studentName)}`
                },
                courses: branch.courses,
                timetable: courseIds.map((courseId, index) => ({
                    id: index + 1,
                    course: branch.courses[courseId],
                    faculty: getRandomElement(FACULTY_NAMES),
                    room: `${branchCode}${101 + index}`,
                    day: getRandomInt(0, 4),
                    time: getRandomInt(0, 8),
                })).filter((val, index, self) => index === self.findIndex(t => t.day === val.day && t.time === val.time)),
                attendance: courseIds.map(courseId => ({
                    course: branch.courses[courseId],
                    percentage: getRandomInt(70, 100)
                })),
                assignments: courseIds.slice(0, 4).map((courseId, index) => ({
                    id: index + 1,
                    courseId,
                    title: `Assignment on ${branch.courses[courseId].split(" ").slice(0,2).join(" ")}`,
                    dueDate: `2025-10-${getRandomInt(1, 28)}`,
                    status: assignmentStatuses[index] || "Pending",
                    grade: index === 0 ? 'A' : null,
                    details: `This assignment covers key concepts from the first module of ${branch.courses[courseId]}. Submission must be a PDF document.`
                })),
                grades: courseIds.map(courseId => ({
                    courseId,
                    courseName: branch.courses[courseId],
                    midTerm: getRandomInt(60, 95),
                    assignments: getRandomInt(70, 100),
                    final: null,
                    overall: null
                })),
                announcements: ANNOUNCEMENTS
            };
        }
    }
    return students;
};

// --- GLOBAL DATABASE VARIABLE ---
// Generate all student data first
const studentDatabase = generateAllStudentData();

// Define Admin and ALL 20 Faculty users
const otherUsers = {
    "admin": { profile: { id: "admin", name: "Admin User", password: "admin123", role: "admin" } },
    "F01": { profile: { id: "F01", name: "Dr. Wilson", password: "faculty123", role: "faculty" } },
    "F02": { profile: { id: "F02", name: "Dr. Sharma", password: "faculty123", role: "faculty" } },
    "F03": { profile: { id: "F03", name: "Prof. Khanna", password: "faculty123", role: "faculty" } },
    "F04": { profile: { id: "F04", name: "Prof. Lovelace", password: "faculty123", role: "faculty" } },
    "F05": { profile: { id: "F05", name: "Dr. Torvalds", password: "faculty123", role: "faculty" } },
    "F06": { profile: { id: "F06", name: "Prof. Codd", password: "faculty123", role: "faculty" } },
    "F07": { profile: { id: "F07", name: "Dr. Hinton", password: "faculty123", role: "faculty" } },
    "F08": { profile: { id: "F08", name: "Prof. Eiffel", password: "faculty123", role: "faculty" } },
    "F09": { profile: { id: "F09", name: "Dr. Bernoulli", password: "faculty123", role: "faculty" } },
    "F10": { profile: { id: "F10", name: "Prof. Lutyens", password: "faculty123", role: "faculty" } },
    "F11": { profile: { id: "F11", name: "Dr. Boole", password: "faculty123", role: "faculty" } },
    "F12": { profile: { id: "F12", name: "Prof. Marconi", password: "faculty123", role: "faculty" } },
    "F13": { profile: { id: "F13", name: "Prof. Fourier", password: "faculty123", role: "faculty" } },
    "F14": { profile: { id: "F14", name: "Dr. Mead", password: "faculty123", role: "faculty" } },
    "F15": { profile: { id: "F15", name: "Prof. Berners-Lee", password: "faculty123", role: "faculty" } },
    "F16": { profile: { id: "F16", name: "Dr. Rivest", password: "faculty123", role: "faculty" } },
    "F17": { profile: { id: "F17", name: "Prof. Bezos", password: "faculty123", role: "faculty" } },
    "F18": { profile: { id: "F18", name: "Dr. Royce", password: "faculty123", role: "faculty" } },
    "F19": { profile: { id: "F19", name: "Prof. Shokhanda", password: "faculty123", role: "faculty" } },
    "F20": { profile: { id: "F20", name: "Dr. Manish", password: "faculty123", role: "faculty" } }
};

// Combine all users into the final AppDatabase
const AppDatabase = { ...studentDatabase, ...otherUsers };