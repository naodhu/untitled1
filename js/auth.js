import { auth, signInUser, signUpUser, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const signUpNameInput = document.getElementById("signUpName");
  const signUpEmailInput = document.getElementById("signUpEmail");
  const signUpPasswordInput = document.getElementById("signUpPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const toggleFormLinks = document.querySelectorAll(".toggleFormLink"); // Use class selector
  const statusMessage = document.createElement("div"); // Create a new status message element
  statusMessage.id = "status-message";
  document.body.appendChild(statusMessage); // Append it to the body

  // Check if DOM elements exist
  if (
    !statusMessage ||
    !signInForm ||
    !signUpForm ||
    toggleFormLinks.length === 0
  ) {
    console.error("Error: One or more required DOM elements not found");
    return;
  }

  console.log("DOM elements loaded:", {
    emailInput,
    passwordInput,
    signInForm,
    signUpForm,
    signUpNameInput,
    signUpEmailInput,
    signUpPasswordInput,
    confirmPasswordInput,
    toggleFormLinks,
    statusMessage,
  });

  // Function to toggle between Sign-In and Sign-Up forms
  const toggleForms = () => {
    console.log("Toggling forms");
    console.log("Sign-In Form Display:", signInForm.style.display);
    console.log("Sign-Up Form Display:", signUpForm.style.display);

    if (signInForm.style.display === "none") {
      // Switch to Sign-In form
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
    } else {
      // Switch to Sign-Up form
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
    }

    console.log("After Toggling:");
    console.log("Sign-In Form Display:", signInForm.style.display);
    console.log("Sign-Up Form Display:", signUpForm.style.display);
  };

  // Attach event listeners to all toggle links
  toggleFormLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default link behavior
      toggleForms(); // Toggle the forms
    });
  });

  // Initialize forms (show Sign-In form by default)
  signInForm.style.display = "block";
  signUpForm.style.display = "none";

  // Sign-In
  signInForm.addEventListener("submit", async (e) => {
    console.log("Sign In form submitted");
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    statusMessage.textContent = "";
    statusMessage.style.display = "none";

    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      showError("Please enter your password.");
      return;
    }

    try {
      console.log("Attempting to sign in with email:", email);
      await signInUser(email, password);
      console.log("Sign-in successful!");
      window.location.href = "welcome.html";
    } catch (error) {
      console.error("Error signing in:", error);
      showError(getErrorMessage(error.code));
    }
  });

  // Sign-Up
  signUpForm.addEventListener("submit", async (e) => {
    console.log("Sign Up form submitted");
    e.preventDefault();
    const name = signUpNameInput.value.trim();
    const email = signUpEmailInput.value.trim();
    const password = signUpPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    try {
      console.log("Attempting to sign up with email:", email);
      const userCredential = await signUpUser(email, password);
      const user = userCredential.user;
      console.log("User authenticated:", user);

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      console.log("Sign-up successful!");
      showSuccess("Account created! Please sign in.");
      toggleForms();
    } catch (error) {
      console.error("Error signing up:", error);
      showError(getErrorMessage(error.code));
    }
  });

  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Convert Firebase error codes to user-friendly messages
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials and try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/email-already-in-use":
        return "This email is already in use. Please use a different email.";
      case "auth/weak-password":
        return "Password is too weak. Please use a stronger password.";
      case "auth/network-request-failed":
        return "A network error occurred. Please check your internet connection.";
      case "auth/popup-closed-by-user":
        return "The sign-in popup was closed. Please try again.";
      default:
        return "An error occurred. Please try again.";
    }
  }

  // Show error message
  function showError(message) {
    if (!statusMessage) {
      console.error("Error: statusMessage element not found in the DOM");
      return;
    }
    statusMessage.textContent = message;
    statusMessage.style.backgroundColor = "#f8d7da";
    statusMessage.style.borderColor = "#f5c6cb";
    statusMessage.style.color = "#721c24";
    statusMessage.style.display = "block";
    statusMessage.style.padding = "10px";
    statusMessage.style.borderRadius = "5px";
    statusMessage.style.marginBottom = "20px";
    statusMessage.style.textAlign = "center";
  }

  // Show success message
  function showSuccess(message) {
    if (!statusMessage) {
      console.error("Error: statusMessage element not found in the DOM");
      return;
    }
    statusMessage.textContent = message;
    statusMessage.style.backgroundColor = "#d4edda";
    statusMessage.style.borderColor = "#c3e6cb";
    statusMessage.style.color = "#155724";
    statusMessage.style.display = "block";
    statusMessage.style.padding = "10px";
    statusMessage.style.borderRadius = "5px";
    statusMessage.style.marginBottom = "20px";
    statusMessage.style.textAlign = "center";
  }
});
