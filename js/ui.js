// Render marks in the table
export function renderMarks(marks) {
  const marksList = document.getElementById("marksList");
  const averageScore = document.getElementById("averageScore");

  if (marks.length === 0) {
    marksList.innerHTML = "<p>No marks recorded yet.</p>";
    averageScore.innerHTML = "";
    return;
  }

  // Create the table structure
  let tableContent = `
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Mark</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Add rows for each mark
  marks.forEach(({ subject, mark, id }) => {
    tableContent += `
      <tr>
        <td>${subject}</td>
        <td>${mark}</td>
        <td>
          <button onclick="editMark('${id}', '${subject}', ${mark})">Edit</button>
          <button onclick="deleteMark('${id}')">Delete</button>
        </td>
      </tr>
    `;
  });

  tableContent += "</tbody></table>";
  marksList.innerHTML = tableContent;

  // Calculate and display the average score
  const average = marks.reduce((sum, { mark }) => sum + mark, 0) / marks.length;
  averageScore.innerHTML = `Average Score: ${average.toFixed(2)}`;
}

// Toggle dark theme and save preference
export function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");

  // Save theme preference to localStorage
  const isDarkTheme = body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
}

// Apply saved theme preference on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}
