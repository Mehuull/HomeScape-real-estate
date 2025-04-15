# Homescape

**Homescape** is a full-stack real estate web application that enables users to explore, post, and manage property listings across various categories. Built using modern technologies, it features a React + Redux Toolkit frontend, CSS for design, and an Express.js + MongoDB backend. Property images are stored via Supabase Storage, while advanced features like location-based searching and AI-powered description generation(pending feature) make it stand out. Deployed seamlessly with Vercel, the project is scalable and production-ready.

---

## Table of Contents

- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies Used](#technologies-used)  
- [Folder Structure](#folder-structure)  
- [Features](#features)  
- [Deployment](#deployment)  
- [Troubleshooting](#troubleshooting)  
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
   cd server && npm start
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

- **Frontend:** React, Redux Toolkit 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
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
