TripMe
======

TripMe is a full-stack web application designed to help solo travelers plan, share, and manage their travel itineraries—all in one platform. 
The app integrates various travel-related features such as AI trip planning, language translation, currency conversion, maps, and social connectivity 
so users can replicate or create their own travel plans.

Table of Contents
-----------------
- Features
- Technology Stack
- Installation
  - Prerequisites
  - Backend Setup
  - Frontend Setup
- Environment Variables
- Usage
- Deployment
- Project Structure
- Contributing
- License
- Authors

Features
--------
- User Authentication: Signup with email OTP verification and secure sign in.
- Trip Itinerary Management: Create, edit, and delete travel itineraries.
- AI Trip Planner: Generate AI-powered travel plans based on destination and duration.
- Social Interaction: Like, comment, and share trip posts.
- Additional Utilities: Integrated language translation, currency conversion, and maps.
- Responsive Design: Works on desktop, tablet, and mobile devices.

Technology Stack
----------------
Frontend:
- React.js – Building interactive UIs.
- React Router – Client-side routing.
- Chakra UI – Component library for responsive design.
- Framer Motion – Smooth animations.
- React Dropzone – File uploads.
- React Toastify – Notifications.
- Lucide-react & React-icons – Iconography.
- React Datepicker – Date selection.
- (Optionally, Tailwind CSS if configured.)

Backend:
- Node.js & Express – Server-side framework.
- MongoDB & Mongoose – Database and object modeling.
- Nodemailer – Sending OTP emails.
- JWT & bcrypt – Authentication and secure password storage.
- dotenv & cors – Environment variable management and CORS.

Installation
------------
Prerequisites:
- Node.js (v14 or later)
- MongoDB Atlas account (or local MongoDB instance)
- Git

Backend Setup:
1. Clone the repository:
   git clone https://github.com/powerpetch/TripMe.git
   cd TripMe

2. Navigate to the backend folder (e.g., "server"):
   cd server

3. Install backend dependencies:
   npm install

4. Create a .env file in the backend folder and set your environment variables:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=tripme.otp@gmail.com
   EMAIL_PASS=your_email_app_password

5. Run the backend server:
   npm run dev
   The backend should now be running on http://localhost:5000.

Frontend Setup:
1. Navigate to the frontend folder (e.g., "client"):
   cd ../client

2. Install frontend dependencies:
   npm install

3. Start the frontend development server:
   npm start
   The frontend should now be running on http://localhost:3000.

Environment Variables
---------------------
Backend (.env file in the server folder):
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=tripme.otp@gmail.com
   EMAIL_PASS=your_email_app_password

Frontend (.env file in the client folder, if using Create React App):
   REACT_APP_API_BASE_URL=http://localhost:5000

Usage
-----
- User Signup & OTP Verification: New users sign up, receive a one-time password (OTP) on their email, and verify their email to activate the account.
- Trip Management: Users can create, edit, and view travel itineraries.
- AI Trip Planning: Users can enter a destination and duration to generate an AI-powered travel plan.
- Social Features: Users can like and comment on trip posts and connect with other travelers.

Deployment
----------
For a full-stack deployment (backend and frontend together), you may consider services like Railway, Render, or Heroku for the backend, and Netlify or GitHub Pages for the frontend.

Example Deployment on Railway and GitHub Pages:

Backend (Railway/Render/Heroku):
1. Set up a project and link it to your GitHub repo.
2. Configure the build and start commands.
3. Set environment variables in the service’s dashboard.
4. Your backend will be available at a service URL (e.g., https://tripme-backend.onrender.com).

Frontend (GitHub Pages):
1. In your frontend’s package.json, set the "homepage" field appropriately:
      "homepage": "https://<your-username>.github.io/TripMe"
2. Install gh-pages:
      npm install --save-dev gh-pages
3. Add the deploy scripts in package.json:
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build",
4. Run:
      npm run deploy
5. In your GitHub repository settings, enable GitHub Pages from the gh-pages branch.
6. Your frontend will be available at https://<your-username>.github.io/TripMe.

Project Structure
-----------------
A typical structure for this project might be:

TripMe/
├── client/          # Frontend React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env (if needed)
├── server/          # Backend Node.js/Express application
│   ├── models/      # Mongoose models (User, TripDetail, etc.)
│   ├── routes/      # API route handlers (auth, trips, etc.)
│   ├── config/      # Configuration (db.js, cloudinary, etc.)
│   ├── index.js     # Main server file
│   ├── package.json
│   └── .env
└── README.md

Contributing
------------
Contributions are welcome! Please fork this repository and open a pull request with your improvements. Make sure to follow the existing code style and include tests for new features if possible.

License
-------
This project is licensed under the MIT License.


King Mongkut’s Institute of Technology Latkrabang – School of Engineering

Happy traveling and coding with TripMe!
