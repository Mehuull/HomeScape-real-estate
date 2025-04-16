# Homescape

**Homescape** is a full-stack real estate web application that enables users to explore, post, and manage property listings across various categories. Built using modern technologies, it features a React + Redux Toolkit frontend, CSS for design, and an Express.js + MongoDB backend. Property images are stored via Supabase Storage, while advanced features like location-based searching and AI-powered description generation(pending feature) make it stand out. Deployed seamlessly with Vercel, the project is scalable and production-ready.<a href="https://homescape-real-estate.netlify.app/">Link to Project</a>

---

## Table of Contents

- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies Used](#technologies-used)  
- [Folder Structure](#folder-structure)  
- [Features](#features)  
- [Contact Information](#contact-information)  
- [Acknowledgments](#acknowledgments)

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Mehuull/HomeScape-real-estate.git
   ```

2. **Navigate to the project folder**  
   ```bash
   cd homescape
   ```

3. **Install dependencies**  
   - Frontend:  
     ```bash
     cd client && npm install
     ```

   - Backend:  
     ```bash
     cd server && npm install
     ```


## Usage

1. **Start the backend server**  
   ```bash
   cd server && npm run dev
   ```

2. **Start the frontend in a separate terminal**  
   ```bash
   cd client && npm run dev
   ```

3. Open your browser and go to:  
   ```
   http://127.0.0.1:5173/
   ```

---

## Technologies Used

- **Frontend:** React, Redux Toolkit ,Googlefonts,cdnfonts,ionicons
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT,bcrypt for encryption  
- **Image Storage:** Supabase   
- **AI Description Generator:** Gemini AI  
---

## Folder Structure

```
homescape/
├── client/     # Frontend source code
│   ├── public/
│   └── src/
├── server/     # Backend source code
│   ├── models/
│   ├── routes/
│   └── utils/
```

---

## Features

- User registration, login & JWT authentication  
- Post, update(pending feature), and delete property listings  
- Filter and search listings  
- AI-generated property descriptions  
- Supabase-powered image uploads   

---


---

## Contact Information

For feedback or collaboration, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/mehulrana10/).

---

## Acknowledgments

**NPM Packages Used:**

**Frontend**
- `@reduxjs/toolkit`
- `axios`
- `react`
- `react-dom`
- `react-icons`
- `react-redux`
- `react-router-dom`

**Backend**
- `bcryptjs`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `mongoose`
- `@google/generative-ai`

  ## What I Learned

Building **Homescape**, my first full-stack real estate web application, was a transformative experience that significantly expanded my development skill set. This project allowed me to move beyond just the frontend and dive into the backend, infrastructure, and deployment workflows with real-world tools.

### 🌐 Frontend Mastery

Creating a responsive and visually appealing interface using **React**, **Redux Toolkit**, and **Tailwind CSS** taught me how to structure reusable components, manage global state efficiently, and design for user experience. I tackled challenges with React hooks like `useState`, `useEffect`, and `useSelector`, and enhanced navigation using `React Router DOM`.

### 🛠️ Backend Foundations

Working with **Node.js**, **Express**, and **MongoDB** pushed me to understand backend architecture, API route handling, and data modeling. I learned to secure routes with **JWT authentication**, structure my backend into modular controllers, and handle errors gracefully.

### 📦 Managing Assets with Supabase

Using **Supabase** for image uploads introduced me to cloud storage integrations. I explored how to upload, retrieve, and store secure image URLs, linking media to MongoDB records to keep the database lightweight.

### 🚀 Deployment Confidence

Deploying Homescape with **Vercel** taught me how to configure build processes, manage environment variables, and organize production-ready code. I also learned to set up `vercel.json` and automate frontend-backend integration.


Overall, this project was more than just a website — it was a full learning journey. It bridged my understanding between frontend creativity and backend logic. I now feel confident in building full-stack applications that are scalable, interactive, and user-focused. Homescape marked a milestone in my growth as a **full-stack developer**, and I'm excited to take on even more advanced challenges ahead.

