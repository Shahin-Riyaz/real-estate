# 🏡 ShaProperties - Real Estate Platform

A modern, responsive real estate web application built with the MERN stack. Users can explore listings, book appointments, and chat with an AI assistant to get property recommendations.

![ShaProperties](https://res.cloudinary.com/dyqmml8de/image/upload/v1743875807/mern-uploads/ycdfuceyqbogvi2vlcsp.jpg)

---

## ✨ Features

- 🔐 User Authentication (Sign In / Sign Up)
- 🏘️ Property Listings (Rent/Sale)
- 📸 Image Uploads with Cloudinary
- 📅 Appointment Booking Form
- 🧠 AI Chatbot (OpenAI)
- 📬 Newsletter Signup
- 🔍 Search & Filter Properties
- 🎯 Responsive Design with Tailwind CSS


---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS, Swiper.js
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT + Firebase OAuth
- **AI Integration:** OpenAI GPT-3.5 Turbo
- **Image Uploads:** Cloudinary


---

## 🖥️ Screenshots

| Home Page | Property Page | Chatbot |
|----------|---------------|---------|
| ![Home](https://i.imgur.com/X3z8sZi.png) | ![Listing](https://i.imgur.com/9UzWUdq.png) | ![Chatbot](https://i.imgur.com/hF5PvXm.png) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas / Local DB
- Cloudinary Account
- OpenAI API Key
- Firebase Config (For Google OAuth)

---

### 📦 Installation

```bash
git clone https://github.com/your-username/real-estate.git
cd real-estate
npm install


Create a .env file in your root directory:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Running the App
bash
Copy
Edit
# Start frontend
npm run dev

# Start backend (in /api folder)
npm run dev
