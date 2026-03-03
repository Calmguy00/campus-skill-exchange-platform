# Campus Skill Exchange Platform

## 📚 Project Overview

**Campus Skill Exchange Platform** is a full-stack web application designed for college students to share skills and request help from peers within their campus community.

### Project Type
College Mini Project – Full Stack Web Application

### Purpose
This platform enables students to:
- Share their skills and expertise with classmates
- Discover skills available from other students
- Send and manage skill request
- Build a collaborative learning community

---

## 🛠 Technology Stack

### Frontend
- **React 18.3** - Component-based UI library
- **React Router 7** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

### Data Storage
- **LocalStorage** - Browser-based data persistence
- Simulates a backend database for:
  - User registration and authentication
  - Skill management (CRUD operations)
  - Request tracking and status updates

### Architecture
- **Single Page Application (SPA)** with client-side routing
- **Component-based architecture** for reusability
- **REST API pattern** simulated with localStorage utilities

---

## 📁 Project Structure

```
campus-skill-exchange/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/               # Reusable UI components
│   │   │   └── Layout.tsx        # Navigation layout
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── RegisterPage.tsx  # User registration
│   │   │   ├── LoginPage.tsx     # User login
│   │   │   ├── DashboardPage.tsx # User dashboard
│   │   │   ├── AddSkillPage.tsx  # Add new skill
│   │   │   └── RequestsPage.tsx  # Manage requests
│   │   ├── utils/
│   │   │   └── storage.ts        # Data management utilities
│   │   ├── App.tsx               # Root component
│   │   └── routes.tsx            # Route configuration
│   └── styles/                   # CSS styles
├── package.json
└── README.md
```

---

## 🗄 Database Schema (Simulated)

### 1. Users Table
```typescript
interface User {
  user_id: number;          // Primary Key, Auto Increment
  name: string;             // VARCHAR(100)
  email: string;            // VARCHAR(100), UNIQUE
  department: string;       // VARCHAR(100)
  year: number;            // INT
  password: string;         // VARCHAR(255)
}
```

### 2. Skills Table
```typescript
interface Skill {
  skill_id: number;         // Primary Key, Auto Increment
  user_id: number;          // Foreign Key → users(user_id)
  skill_name: string;       // VARCHAR(100)
  description: string;      // TEXT
}
```

### 3. Requests Table
```typescript
interface Request {
  request_id: number;       // Primary Key, Auto Increment
  sender_id: number;        // INT → users(user_id)
  receiver_id: number;      // INT → users(user_id)
  skill_id: number;         // INT → skills(skill_id)
  status: string;           // ENUM('Pending', 'Accepted', 'Rejected')
}
```

---

## 🎨 Features

### 1. Home Page
- Hero section with platform introduction
- Feature cards highlighting key functionality
- Call-to-action buttons for registration and login

### 2. User Authentication
- **Registration**: Name, Email, Department, Year, Password
- **Login**: Email and Password validation
- Session management using localStorage

### 3. Dashboard
- User profile display
- Personal skills showcase
- Available skills from other students
- Quick actions (Add Skill, Send Request)

### 4. Skill Management
- Add new skills with name and description
- View all personal skills
- Browse skills from other students
- Organized card-based layout

### 5. Request System
- **Incoming Requests**: View and manage requests received
  - Accept or reject requests
  - View requester details
- **Sent Requests**: Track your sent requests
  - View request status (Pending/Accepted/Rejected)
  - Contact information upon acceptance

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📖 How to Use

### For New Users

1. **Register an Account**
   - Click "Register" in the navigation
   - Fill in your details (Name, Email, Department, Year, Password)
   - Submit the form

2. **Login**
   - Use your registered email and password
   - Access your dashboard

3. **Add Your Skills**
   - Navigate to "Add Skill" page
   - Enter skill name (e.g., "React Development")
   - Provide a detailed description
   - Submit to showcase your expertise

4. **Browse Available Skills**
   - View skills from other students on your dashboard
   - See details including skill owner's name, department, and year

5. **Send Skill Requests**
   - Click "Send Request" on any skill you're interested in
   - Request appears in the recipient's incoming requests

6. **Manage Requests**
   - Go to "Requests" page
   - **Incoming tab**: Accept or reject requests from others
   - **Sent tab**: Track status of your sent requests

---

## 🎯 API Operations (Simulated)

All operations are handled through the `storage.ts` utility:

### User Operations
- `registerUser()` - Create new user account
- `loginUser()` - Authenticate user credentials
- `getCurrentUser()` - Get logged-in user details
- `logoutUser()` - Clear user session

### Skill Operations
- `addSkill()` - Add new skill
- `getAllSkills()` - Get all skills
- `getUserSkills()` - Get skills by user ID
- `getOtherUsersSkills()` - Get skills from other users

### Request Operations
- `sendRequest()` - Send skill request
- `updateRequestStatus()` - Accept/reject request
- `getIncomingRequests()` - Get received requests
- `getSentRequests()` - Get sent requests

---

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Secondary**: White (#ffffff)
- **Accents**: Blue gradients
- **Text**: Blue-900 for headings, Gray for body

### UI Components
- Card-based layouts for content organization
- Responsive design (mobile + desktop)
- Professional navigation bar
- Toast notifications for user feedback
- Badge indicators for request status
- Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible grid layouts
- Touch-friendly buttons

---

## 🔐 Security Notes

⚠️ **Important**: This is a demonstration project for educational purposes.

- Passwords are stored in plain text (not recommended for production)
- No actual backend server or database
- Data persists in browser localStorage only
- For production use, implement:
  - Password hashing (bcrypt)
  - JWT authentication
  - Actual database (MySQL/PostgreSQL)
  - Backend API server (Node.js/Express)
  - HTTPS encryption
  - Input validation and sanitization

---

## 📝 Future Enhancements

Potential features for expansion:
- [ ] User profile pictures
- [ ] Skill categories and tags
- [ ] Search and filter functionality
- [ ] Rating and review system
- [ ] Messaging between users
- [ ] Notification system
- [ ] Admin dashboard
- [ ] Export data functionality
- [ ] Dark mode toggle

---

## 🧪 Testing the Application

### Sample Test Flow

1. **Create First User**
   - Name: John Doe
   - Email: john@college.edu
   - Department: Computer Science
   - Year: 3
   - Password: test123

2. **Add Skills**
   - Skill: "React Development"
   - Description: "I can help with React basics and advanced concepts"

3. **Create Second User**
   - Register another user with different credentials

4. **Send Request**
   - Login as second user
   - Browse available skills
   - Send request to John's React skill

5. **Manage Request**
   - Login as John
   - Go to Requests page
   - View and accept the request

6. **Check Status**
   - Login as second user
   - View sent requests to see "Accepted" status

---

## 💡 Learning Outcomes

This project demonstrates:
- ✅ React component architecture
- ✅ Client-side routing with React Router
- ✅ State management with React hooks
- ✅ Form handling and validation
- ✅ CRUD operations
- ✅ Data persistence with localStorage
- ✅ Responsive UI design with Tailwind CSS
- ✅ User authentication flow
- ✅ Relational data modeling
- ✅ Component reusability

---

## 📄 License

This project is created for educational purposes as a college mini project.

---

## 👥 Credits

Built with modern web technologies:
- React
- React Router
- Tailwind CSS
- Radix UI Components
- Lucide Icons

---

## 🤝 Contributing

This is a mini project for learning purposes. Feel free to:
- Fork and experiment
- Add new features
- Improve the design
- Enhance functionality

---

## 📞 Support

For questions or issues related to this project, refer to:
- React documentation: https://react.dev
- React Router docs: https://reactrouter.com
- Tailwind CSS docs: https://tailwindcss.com

---

**Happy Coding! 🚀**
