document.addEventListener("DOMContentLoaded", function () {
  const studentForm = document.getElementById("studentForm");
  const tableBody = document.getElementById("studentsTableBody");

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let editIndex = -1;

  // Function to render table
  function renderStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.number}</td>
        <td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // ✅ Save to localStorage whenever we update
    localStorage.setItem("students", JSON.stringify(students));

    // ✅ Attach event listeners *after* rendering
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        editStudent(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deleteStudent(index);
      });
    });
  }

  // Form submission
  studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentname = document.getElementById("studentname").value.trim();
    const studentid = document.getElementById("studentid").value.trim();
    const email = document.getElementById("email").value.trim();
    const contactnumber = document.getElementById("contactnumber").value.trim();

    if (!studentname || !studentid || !email || !contactnumber) {
      alert("Please fill out all fields!");
      return;
    }

    const student = {
      name: studentname,
      id: studentid,
      email,
      number: contactnumber,
    };

    if (editIndex === -1) {
      students.push(student); // Add new
    } else {
      students[editIndex] = student; // Update existing
      editIndex = -1;
    }

    studentForm.reset();
    renderStudents();
  });

  // Edit student
  function editStudent(index) {
    const student = students[index];
    document.getElementById("studentname").value = student.name;
    document.getElementById("studentid").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contactnumber").value = student.number;

    editIndex = index;
  }

  // Delete student
  function deleteStudent(index) {
    if (confirm("Delete this student?")) {
      students.splice(index, 1);
      renderStudents();
    }
  }

  // ✅ Initial render on page load
  renderStudents();
});

