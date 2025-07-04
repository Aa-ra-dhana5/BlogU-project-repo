
# BlogU – React + Appwrite Blogging Platform

**BlogU** is a modern blogging platform built using **React.js**, **Tailwind CSS**, and **Appwrite**. It allows users to register, log in, and manage their blog posts with a clean, responsive interface. Appwrite is used for user authentication, database storage, and media uploads.

---

## 🚀 Features

- User authentication (signup, login, logout)
- Create, read, update, and delete blog posts
- Upload featured images for posts
- Secure access via Appwrite’s authentication and database
- Mobile-friendly and responsive UI
- Built with Vite for faster development

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend Services:** Appwrite (Auth, Database, Storage)
- **Routing:** React Router DOM

---

## 📦 Getting Started

### 1. Clone the repository

```bash`
git clone https://github.com/Aa-ra-dhana5/BlogU-project-repo.git
cd BlogU-project-repo


### 2. Install dependencies

```bash`
npm install

3. Configure Appwrite
Go to https://cloud.appwrite.io or your Appwrite instance.

Create a new project and enable Authentication, Database, and Storage.

Create your users, posts collection, and required buckets.

4. Create a .env file

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

5. Run the development server
 ```bash `
 npm run dev

Open http://localhost:5173 to view it in your browser.



**🙋‍♀️ Author**
Developed with ❤️ by Aaradhana Parmar

