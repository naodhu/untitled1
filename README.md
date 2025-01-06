# GradeGenius - Mark Tracker Application

## Overview

GradeGenius is a web-based application designed to help students track their academic performance by recording and managing their grades across different subjects. The application provides a user-friendly interface for adding, editing, and deleting marks, calculating average scores, and visualizing progress. It also includes user authentication, allowing students to securely log in and manage their data.

This project is built using modern web technologies, including HTML5, CSS3, JavaScript, and Firebase for backend services such as authentication, database management, and real-time data synchronization.

## Features

### 1. User Authentication

- **Sign Up**: New users can create an account by providing their name, email, and password.
- **Sign In**: Existing users can log in using their email and password.
- **Log Out**: Users can securely log out of their accounts.

### 2. Grade Management

- **Add Marks**: Users can add marks for different subjects, specifying the subject name and the corresponding grade.
- **Edit Marks**: Users can update existing marks if there are any changes.
- **Delete Marks**: Users can remove marks that are no longer needed.
- **Real-Time Updates**: Marks are updated in real-time using Firebase Firestore.

### 3. Average Score Calculation

The application automatically calculates the average score based on the recorded marks, providing users with a quick overview of their academic performance.

### 4. Dark/Light Theme Toggle

Users can switch between dark and light themes based on their preference. The theme preference is saved in local storage for consistency across sessions.

### 5. Responsive Design

The application is fully responsive, ensuring a seamless experience across various devices, including desktops, tablets, and mobile phones.

### 6. Social Media Integration

The landing page includes links to social media platforms (Facebook, Dribbble, Instagram) for additional engagement.

## Technologies Used

### Frontend

- **HTML5**: For structuring the web pages.
- **CSS3**: For styling and layout, including animations and responsive design.
- **JavaScript**: For dynamic content and interactivity.
- **FontAwesome**: For icons used in the UI.
- **Google Fonts**: For custom typography (Montserrat and Playfair Display).

### Backend

**Firebase**:

- **Firebase Authentication**: For user authentication (sign-up, sign-in, and sign-out).
- **Firestore Database**: For storing and managing user data, including marks and profile information.
- **Firebase Hosting**: For deploying the application (optional).

### Additional Libraries

- **Animate.css**: For adding animations to the UI.
- **Ionicons**: For additional icons in the authentication forms.

## Project Structure

### Files and Folders

- **index.html**: The landing page of the application, featuring a welcoming interface with social media links and a login button.
- **auth.html**: The authentication page where users can sign up or log in.
- **welcome.html**: The main dashboard where users can manage their grades, view their average score, and toggle themes.
- **css/**: Contains all the stylesheets for the application.
  - **welcome.css**: Styles for the landing page.
  - **auth.css**: Styles for the authentication page.
  - **style.css**: Styles for the main dashboard.
- **js/**: Contains all the JavaScript files for the application.
  - **firebase.js**: Handles Firebase initialization and authentication functions.
  - **auth.js**: Manages user authentication logic (sign-up, sign-in, and error handling).
  - **app.js**: Handles grade management logic (adding, editing, and deleting marks).
  - **ui.js**: Manages UI updates, including rendering marks and toggling themes.
  - **profile.js**: Handles user profile updates and account deletion (optional).
- **img/**: Contains images used in the application, such as the favicon and logo.

## Installation and Setup

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).
- A Firebase project with Firestore and Authentication enabled.
- Node.js and npm (optional, for local development).

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/GradeGenius.git
   cd GradeGenius
   ```

2. **Set Up Firebase**:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
   - Enable Firestore and Authentication (Email/Password) in your Firebase project.
   - Replace the Firebase configuration in `firebase.js` with your own Firebase project credentials.

3. **Run the Application**:

   - Open the `index.html` file in your browser to start the application.
   - Alternatively, you can use a local server (e.g., `live-server` or `http-server`) to serve the files.

4. **Deploy to Firebase Hosting (Optional)**:
   - **Install Firebase CLI**:
     ```bash
     npm install -g firebase-tools
     ```
   - **Log in to Firebase**:
     ```bash
     firebase login
     ```
   - **Initialize Firebase Hosting**:
     ```bash
     firebase init
     ```
   - **Deploy the application**:
     ```bash
     firebase deploy
     ```

## Usage

### Landing Page

- Visit the landing page to learn more about the application and access the login button.

### Authentication

- New users can sign up by providing their name, email, and password.
- Existing users can log in using their email and password.

### Dashboard

- After logging in, users can:
  - Add new marks for different subjects.
  - Edit or delete existing marks.
  - View their average score.
  - Toggle between dark and light themes.
  - Log out of their account.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgments

- **Firebase**: For providing a robust backend solution for authentication and database management.
- **Google Fonts**: For the beautiful typography used in the application.
- **FontAwesome and Ionicons**: For the icons used in the UI.

## Contact

For any questions or feedback, please contact:

**Your Name**

- Email: [naodhunde@gmail.com](mailto:naodhunde@gmail.com)
- GitHub: [naodhu](https://github.com/naodhu)
- LinkedIn: [naodhu](https://linkedin.com/in/naodhu)
