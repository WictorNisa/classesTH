// Classes *******************************

class School {
  constructor(name, adress, zipcode, city) {
    this.name = name;
    this.adress = adress;
    this.zipcode = zipcode;
    this.city = city;
    this.students = [];
    this.teachers = [];
  }
  addTeacher(teacher) {
    if (!this.teachers.includes(teacher)) {
      this.teachers.push(teacher);
    } else {
      console.log(`${teacher} already works at ${this.name}`);
    }
  }
  addStudent(student) {
    if (!this.students.includes(student)) {
      this.students.push(student);
    } else {
      console.log(`${student} is already enrolled in ${this.name}`);
    }
  }
  removeTeacher(teacher) {
    if (this.teachers.includes(teacher)) {
      this.teachers = this.teachers.filter((t) => t.name !== teacher.name);

      for (const subject of teacher.subjects) {
        subject.teacher = null;
      }
    }
  }
  fireTeacher(teacher) {
    if (this.teachers.includes(teacher)) {
      console.log(
        `${teacher.name} has been fired from this school. Contact principle for more information.`
      );
      this.teachers = this.teachers.filter((t) => t.name !== teacher.name);

      for (const subject of teacher.subjects) {
        subject.teacher = null;
      }
    }
  }
  generateStudentReport(student) {}
}
// ------------------------------------------------------------------------------------------------------------------------------

class Grade {
  constructor(score, student, subject, date) {
    this.score = score;
    this.student = student;
    this.subject = subject;
    this.date = new Date().toDateString();
  }
  updateScore(newscore) {
    this.score = newscore;
  }
  displayInfo() {
    console.log(
      `Student: ${this.student.name}, Subject: ${this.subject.name}, Score: ${this.score}, Date: ${this.date}`
    );
  }
}

// ------------------------------------------------------------------------------------------------------------------------------

class Subject {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teacher = null;
    this.grades = {};
  }
  addStudent(student) {
    if (!this.students.includes(student)) {
      this.students.push(student);
    } else {
      console.log(`${student.name} is already enrolled in ${this.name}`);
    }
  }
  addTeacher(teacher) {
    if (this.teacher === null) {
      this.teacher = teacher;
      teacher.addSubject(this);
    } else {
      console.log(`${this.name} already has a teacher`);
    }
  }
}
// ------------------------------------------------------------------------------------------------------------------------------
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.subjects = [];
    this.grades = [];
  }
  enlistToSubject(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
      subject.addStudent(this);
    } else {
      console.log(`${this.name} is already enrolled in this ${subject.name}`);
    }
  }
  quitSubject(subject) {
    this.subjects = this.subjects.filter((s) => s.name !== subject.name);
    subject.students = subject.students.filter(
      (student) => student.name !== this.name
    );
  }
  addGrade(grade) {
    this.grades.push(grade);
  }
}

// ------------------------------------------------------------------------------------------------------------------------------

class Teacher {
  constructor(name) {
    this.name = name;
    this.subjects = [];
  }
  addSubject(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
      subject.addTeacher(this);
    } else {
      console.log(`${this.name} already teaches ${subject.name}`);
    }
  }
}

// Helper functions **************

// const addSubjectToTeacher = (subject, teacher) => {
//   if (!teacher.subjects.includes(subject)) {
//     teacher.subjects.push(subject);
//   }
//   if (subject.teacher === null) {
//     subject.teacher = teacher;
//   }
//   return teacher;
// };

const displayAllStudents = (school) => {
  for (const student of school.students) {
    let subjectForEachStudent = [];
    for (const subject of student.subjects) {
      subjectForEachStudent.push(subject.name);
    }
    subjectForEachStudent = subjectForEachStudent.join(", ");
    console.log(
      `Student Name: ${student.name}, Age: ${student.age}, Enrolled in subject(s): ${subjectForEachStudent}`
    );
  }
};

const displayAllSubjectsOfStudent = (student) => {
  let subjectForEachStudent = [];
  for (const subject of student.subjects) {
    subjectForEachStudent.push(subject.name);
  }
  subjectForEachStudent = subjectForEachStudent.join(", ");
  console.log(
    `Student ${student.name}, is enrolled in subject(s): ${subjectForEachStudent}`
  );
  return subjectForEachStudent;
};

const displayAllStudentsEnlistedToSubject = (subject) => {
  let studentsEnlistedToSubject = [];
  for (const student of subject.students) {
    studentsEnlistedToSubject.push(student.name);
  }
  console.log(`Enrolled in ${subject.name}: ${studentsEnlistedToSubject}`);
  return studentsEnlistedToSubject;
};

const displayAllTeachers = (school) => {
  let allTeachers = [];
  for (const teacher of school.teachers) {
    allTeachers.push(teacher.name);
  }
  console.log(allTeachers);
  return allTeachers;
};

// ------------------------------------------------------------------------------------------------------------------------------
const teknikhogskolan = new School(
  "Teknikhogskolan",
  "Kalkstensvägen 3",
  22478,
  "Lund"
);
const math = new Subject("Math");
const english = new Subject("English");
const history = new Subject("History");

const wictor = new Student("Wictor", 29);
const julia = new Student("Julia", 25);
const conny = new Student("Conny", 20);

const niklas = new Teacher("Niklas");
const lars = new Teacher("Lars");

const grade = new Grade(90, wictor, english);

// Adding teachers and students to the school
teknikhogskolan.addTeacher(niklas);
teknikhogskolan.addStudent(wictor);
teknikhogskolan.addStudent(julia);
teknikhogskolan.addStudent(conny);

// Enlisting students to subjects
wictor.enlistToSubject(math);
wictor.enlistToSubject(history);
wictor.enlistToSubject(english);
julia.enlistToSubject(english);
conny.enlistToSubject(english);

// Adding subjects to the teacher
niklas.addSubject(math);
niklas.addSubject(history);

console.log(teknikhogskolan);
console.log(math);
console.log(english);
console.log(niklas);

console.log(teknikhogskolan);
teknikhogskolan.removeTeacher(niklas);
console.log(math);
teknikhogskolan.addTeacher(lars);
teknikhogskolan.addTeacher(niklas);

displayAllStudents(teknikhogskolan);
displayAllSubjectsOfStudent(wictor);
displayAllTeachers(teknikhogskolan);
displayAllStudentsEnlistedToSubject(english);
grade.displayInfo();
grade.updateScore(100);
julia.addGrade(grade);
grade.displayInfo();
