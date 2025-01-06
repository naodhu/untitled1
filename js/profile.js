import { db, auth } from "./firebase.js";
import {
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { deleteUser } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const profileForm = document.getElementById("profileForm");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

// Update Profile
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const profilePicture = document.getElementById("profilePicture").files[0];

  try {
    const user = auth.currentUser;
    if (user) {
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      // Upload profile picture (optional, requires Firebase Storage)
      if (profilePicture) {
        // Implement Firebase Storage upload logic here
      }

      alert("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
});

// Delete Account
deleteAccountBtn.addEventListener("click", async () => {
  if (
    confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    )
  ) {
    try {
      const user = auth.currentUser;
      if (user) {
        // Delete user data from Firestore
        await deleteDoc(doc(db, "users", user.uid));

        // Delete user account
        await deleteUser(user);

        alert("Account deleted successfully.");
        window.location.href = "auth.html";
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  }
});
