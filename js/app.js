import { db, auth, signOutUser } from "./firebase.js";
import { renderMarks, toggleTheme } from "./ui.js"; // Import UI functions
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

let isEditing = false;
let editId = null;

// Check if the user is logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    fetchMarks(user.uid); // Fetch marks for the logged-in user
  } else {
    window.location.href = "auth.html"; // Redirect to sign-in page if not logged in
  }
});

// Fetch marks for a specific user
function fetchMarks(userId) {
  const q = query(collection(db, "marks"), where("userID", "==", userId));

  onSnapshot(
    q,
    (snapshot) => {
      const marks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      renderMarks(marks); // Render marks in the UI
    },
    (error) => {
      console.error("Error fetching marks:", error);
    }
  );
}

// Add or update a mark

async function addOrUpdateMark() {
  console.log("Starting addOrUpdateMark function"); // Log the start of the function
  const subjectInput = document.getElementById("subject");
  const markInput = document.getElementById("mark");

  if (!subjectInput || !markInput) {
    console.error("Error: Subject or Mark input not found in the DOM");
    return;
  }

  const subject = subjectInput.value.trim();
  const mark = parseFloat(markInput.value);

  console.log("Subject:", subject); // Debugging log
  console.log("Mark:", mark); // Debugging log

  if (subject && !isNaN(mark) && mark >= 0 && mark <= 100) {
    try {
      if (isEditing) {
        console.log("Updating existing mark with ID:", editId); // Debugging log
        const docRef = doc(db, "marks", editId);
        await updateDoc(docRef, { subject, mark });
        isEditing = false;
        editId = null;
        document.querySelector(".btn").textContent = "Add Mark"; // Reset button text
        subjectInput.value = ""; // Reset subject input
        markInput.value = ""; // Reset mark input
      } else {
        console.log("Adding new mark for user:", auth.currentUser.uid); // Debugging log
        await addDoc(collection(db, "marks"), {
          subject,
          mark,
          userID: auth.currentUser.uid,
        });
        subjectInput.value = ""; // Reset subject input
        markInput.value = ""; // Reset mark input
      }
    } catch (error) {
      console.error("Error adding/updating document:", error); // Debugging log
    }
  } else {
    alert("Please enter a valid subject and mark (0-100).");
  }
}

// Event listeners
const addMarkButton = document.querySelector(".btn");
if (addMarkButton) {
  console.log("Add Mark button found in the DOM"); // Debugging log
  addMarkButton.addEventListener("click", addOrUpdateMark);
} else {
  console.error("Error: Add Mark button not found in the DOM");
}

document
  .querySelector(".theme-toggle button")
  .addEventListener("click", toggleTheme);

// Function to sign out
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOutUser();
  window.location.href = "auth.html"; // Redirect to sign-in page
});

// Function to edit a mark
window.editMark = (id, subject, mark) => {
  document.getElementById("subject").value = subject;
  document.getElementById("mark").value = mark;
  isEditing = true;
  editId = id;
  document.querySelector(".btn").textContent = "Update Mark"; // Change button text to indicate editing
};

// Function to delete a mark
window.deleteMark = async (id) => {
  if (confirm("Are you sure you want to delete this mark?")) {
    try {
      await deleteDoc(doc(db, "marks", id));
      console.log("Mark deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }
};
