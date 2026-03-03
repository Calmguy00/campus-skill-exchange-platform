# 📦 Campus Skill Exchange - Complete Setup Guide

## Quick Start (Current Environment)

The project is **already running** in your Figma Make environment! All files are created and ready to use.

---

## 🏠 To Run This Project Locally on Your Computer

### Prerequisites
- Node.js v16+ installed
- npm or pnpm package manager
- Code editor (VS Code recommended)

---

## Method 1: Using the Current Files

### Step 1: Download Project Files
If your environment has export functionality, export all files in the current workspace.

### Step 2: Install Dependencies
```bash
cd campus-skill-exchange
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open Browser
Navigate to `http://localhost:5173`

---

## Method 2: Create from Scratch

### 1. Initialize New Project

```bash
# Create project folder
mkdir campus-skill-exchange
cd campus-skill-exchange

# Initialize with Vite
npm create vite@latest . -- --template react-ts
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install react-router@7.13.0

# UI Components
npm install @radix-ui/react-accordion@1.2.3
npm install @radix-ui/react-alert-dialog@1.1.6
npm install @radix-ui/react-avatar@1.1.3
npm install @radix-ui/react-checkbox@1.1.4
npm install @radix-ui/react-dialog@1.1.6
npm install @radix-ui/react-dropdown-menu@2.1.6
npm install @radix-ui/react-label@2.1.2
npm install @radix-ui/react-select@2.1.6
npm install @radix-ui/react-separator@1.1.2
npm install @radix-ui/react-slot@1.1.2
npm install @radix-ui/react-tabs@1.1.3

# Utilities
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react sonner

# Tailwind CSS
npm install -D tailwindcss@4.1.12 @tailwindcss/vite@4.1.12 postcss
```

### 3. Create File Structure

```bash
# Create directories
mkdir -p src/app/components/ui
mkdir -p src/app/pages
mkdir -p src/app/utils
mkdir -p src/styles
```

### 4. Copy Files

You need to create these files with the content from the current project:

#### Configuration Files
- `vite.config.ts`
- `postcss.config.mjs`
- `tsconfig.json`
- `package.json`

#### Source Files
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/routes.tsx`

#### Components
- `src/app/components/Layout.tsx`
- `src/app/components/ui/button.tsx`
- `src/app/components/ui/card.tsx`
- `src/app/components/ui/input.tsx`
- `src/app/components/ui/label.tsx`
- `src/app/components/ui/select.tsx`
- `src/app/components/ui/textarea.tsx`
- `src/app/components/ui/badge.tsx`
- `src/app/components/ui/tabs.tsx`
- `src/app/components/ui/sonner.tsx`
- `src/app/components/ui/utils.ts`

#### Pages
- `src/app/pages/HomePage.tsx`
- `src/app/pages/RegisterPage.tsx`
- `src/app/pages/LoginPage.tsx`
- `src/app/pages/DashboardPage.tsx`
- `src/app/pages/AddSkillPage.tsx`
- `src/app/pages/RequestsPage.tsx`

#### Utils
- `src/app/utils/storage.ts`

#### Styles
- `src/styles/index.css`
- `src/styles/tailwind.css`
- `src/styles/theme.css`

### 5. Run the Project

```bash
npm run dev
```

---

## 📋 File Contents Checklist

Use the file explorer in your current environment to view and copy each file:

### ✅ Core Files (Must Copy)
- [ ] `/src/app/App.tsx`
- [ ] `/src/app/routes.tsx`
- [ ] `/src/app/utils/storage.ts`
- [ ] `/src/app/components/Layout.tsx`

### ✅ Page Files (Must Copy)
- [ ] `/src/app/pages/HomePage.tsx`
- [ ] `/src/app/pages/RegisterPage.tsx`
- [ ] `/src/app/pages/LoginPage.tsx`
- [ ] `/src/app/pages/DashboardPage.tsx`
- [ ] `/src/app/pages/AddSkillPage.tsx`
- [ ] `/src/app/pages/RequestsPage.tsx`

### ✅ UI Components (Copy needed ones)
- [ ] `/src/app/components/ui/button.tsx`
- [ ] `/src/app/components/ui/card.tsx`
- [ ] `/src/app/components/ui/input.tsx`
- [ ] `/src/app/components/ui/label.tsx`
- [ ] `/src/app/components/ui/select.tsx`
- [ ] `/src/app/components/ui/textarea.tsx`
- [ ] `/src/app/components/ui/badge.tsx`
- [ ] `/src/app/components/ui/tabs.tsx`
- [ ] `/src/app/components/ui/sonner.tsx`

### ✅ Styles (Must Copy)
- [ ] `/src/styles/index.css`
- [ ] `/src/styles/tailwind.css`
- [ ] `/src/styles/theme.css`

### ✅ Config Files (Must Copy)
- [ ] `/package.json`
- [ ] `/vite.config.ts`
- [ ] `/postcss.config.mjs`

---

## 🎯 Testing After Setup

1. **Start the server**: `npm run dev`
2. **Open browser**: `http://localhost:5173`
3. **Register a user**
4. **Login**
5. **Add skills**
6. **Test requests**

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check Node version
node --version  # Should be v16+

# Update dependencies
npm update
```

---

## 📚 Project Structure After Setup

```
campus-skill-exchange/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AddSkillPage.tsx
│   │   │   └── RequestsPage.tsx
│   │   ├── utils/
│   │   │   └── storage.ts
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx
├── package.json
├── vite.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## ✅ Verification

After setup, verify everything works:

- [ ] Development server runs without errors
- [ ] Home page loads with hero section
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Dashboard displays correctly
- [ ] Can add new skills
- [ ] Can send requests
- [ ] Can view and manage requests

---

## 🚀 Next Steps

1. Customize the design
2. Add more features
3. Implement real backend (Node.js + MySQL)
4. Deploy to hosting service
5. Add proper authentication (JWT)

---

## 📞 Need Help?

- Check the README.md for detailed documentation
- Review component files for implementation details
- Test incrementally while building

**Happy Coding! 🎓**
