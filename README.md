# 🔍 Smart Lost & Found Web Portal

A centralized and intelligent platform to report, search, and recover lost or found items within an organization or community. Built using the MERN stack, this system aims to simplify the recovery process and ensure efficient item tracking with real-time updates and admin verification.

---

## 📌 Features

* 🔐 **User Authentication**: Secure login & registration (JWT-based)
* 📝 **Lost & Found Listings**: Easily report lost or found items with detailed descriptions, images, and contact info
* 🧠 **Smart Matching**: Uses keyword/tag matching to suggest potential matches for lost & found items
* 🎛️ **Admin Dashboard**: Admins can approve/reject item listings and handle disputes
* 📨 **Real-Time Notifications**: Alerts via email or dashboard when potential matches are found
* 📊 **Analytics Panel**: Track resolved items, pending claims, and user activity (planned)
* 📱 **Responsive Design**: Fully responsive for web and mobile viewports

---

## 🚀 Tech Stack

| Frontend     | Backend     | Database | Other Tools               |
| ------------ | ----------- | -------- | ------------------------- |
| React.js     | Node.js     | MongoDB  | Cloudinary (image upload) |
| Tailwind CSS | Express.js  |          | JWT Auth                  |
| React Router | Mongoose    |          | Multer (file uploads)     |
| Axios        |             |          | Vite/Webpack              |

> \*Optional/Planned features

---

## 📁 Project Structure

```
client/               → React frontend
├── components/       → Reusable components (Navbar, ItemCard, etc.)
├── pages/            → Route pages (Home, ReportItem, Dashboard)
├── services/         → API communication logic

server/               → Express backend
├── routes/           → API routes (items, auth, admin)
├── controllers/      → Logic for handling API endpoints
├── models/           → Mongoose schemas (User, Item)
├── middleware/       → JWT auth, error handling
├── utils/            → Helper functions (email, matching)
```

---

## 🧪 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jamalimubashirali/Lost-Found-Portal
   cd Lost-Found-Portal
   ```

2. **Setup backend:**

   ```bash
   cd server
   npm install
   # Set environment variables (Mongo URI, JWT secret, etc.)
   npm run dev
   ```

3. **Setup frontend:**

   ```bash
   cd ../client
   npm install
   npm run dev
   ```

---

## 🔐 Environment Variables

Create `.env` file for frontend and backend from `.sample.env` present in both directories.

```backend_env
MONGODB_URI="mongodb_uri"
JWT_SECRET_KEY="JWT_secret_key"
FONTEND_ORIGIN="Frontend_origin"
CLOUDINARY_API_SECRET="cloudinary_api_secret"
CLOUDINARY_API_KEY="cloudinary_api_key"
CLOUDINARY_CLOUD_NAME="cloudinary_database_name"
ADMIN_NAME="Admin"
ADMIN_USERNAME="admin_username"
ADMIN_EMAIL="admin_email"
ADMIN_PASSWORD="admin_password"
ADMIN_ROLE="admin"
```

```frontend_env
VITE_BACKEND_URL="backend_url"
```

---

## 📸 Screenshots

> Add screenshots/gifs here of:

* Homepage
* Item Reporting Form
* Admin Panel
* Search/Smart Match Results

---

## ✨ Future Enhancements

* AI-powered image/text matching for item suggestions
* Multi-language support
* Location tagging via Google Maps API
* Mobile app (React Native or Flutter)

---

## 🤝 Contribution Guidelines

1. Fork the repo and create your branch.
2. Make your changes and test locally.
3. Push to your fork and submit a PR.
4. Ensure you follow code formatting guidelines and add comments.


---

## 💬 Contact

For questions, feedback, or contributions:

* Email: [your.email@example.com](mailto:your.email@example.com)
* LinkedIn: [Your Name](https://linkedin.com/in/yourname)
* GitHub: [@yourusername](https://github.com/yourusername)

---

**Let’s build a world where nothing truly gets lost.**

