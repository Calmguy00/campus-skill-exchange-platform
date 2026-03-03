# 🔄 Campus Skill Exchange - Application Flow Diagram

## 📱 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     CAMPUS SKILL EXCHANGE                        │
│                   Full Application Flow Map                      │
└─────────────────────────────────────────────────────────────────┘

                         START HERE
                              │
                              ▼
                    ┌─────────────────┐
                    │   HOME PAGE     │
                    │   Route: /      │
                    │                 │
                    │ • Hero Section  │
                    │ • Features      │
                    │ • CTA Buttons   │
                    └─────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        ┌────────────────┐      ┌────────────────┐
        │ REGISTER PAGE  │      │  LOGIN PAGE    │
        │ Route: /register│      │ Route: /login  │
        │                 │      │                │
        │ • Name          │      │ • Email        │
        │ • Email         │      │ • Password     │
        │ • Department    │      │                │
        │ • Year          │      │ ✓ Validation   │
        │ • Password      │      └────────────────┘
        │                 │               │
        │ ✓ Validation    │               │
        └────────────────┘               │
                 │                        │
                 │   Registration Success │
                 └───────────┬────────────┘
                             │
                  ┌──────────▼──────────┐
                  │  LOGIN REQUIRED     │
                  │  Authentication     │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   DASHBOARD PAGE    │◄──────────┐
                  │  Route: /dashboard  │           │
                  │                     │           │
                  │ ┌─────────────────┐ │           │
                  │ │ User Profile    │ │           │
                  │ │ • Name          │ │           │
                  │ │ • Department    │ │           │
                  │ │ • Email         │ │           │
                  │ └─────────────────┘ │           │
                  │                     │           │
                  │ ┌─────────────────┐ │           │
                  │ │ MY SKILLS       │ │           │
                  │ │ • List of skills│ │           │
                  │ │ • Add Skill btn │─┼──┐        │
                  │ └─────────────────┘ │  │        │
                  │                     │  │        │
                  │ ┌─────────────────┐ │  │        │
                  │ │ OTHER STUDENTS  │ │  │        │
                  │ │ • Browse skills │ │  │        │
                  │ │ • Send Request  │─┼──┼───┐    │
                  │ └─────────────────┘ │  │   │    │
                  └─────────────────────┘  │   │    │
                             │              │   │    │
                    ┌────────┴────────┐     │   │    │
                    │                 │     │   │    │
                    ▼                 ▼     │   │    │
         ┌──────────────────┐  ┌─────────────────┐  │
         │  ADD SKILL PAGE  │  │  REQUESTS PAGE  │  │
         │  Route: /add-skill│  │ Route: /requests│  │
         │                   │  │                 │  │
         │ • Skill Name      │  │ ┌─────────────┐ │  │
         │ • Description     │  │ │  INCOMING   │ │  │
         │                   │  │ │  REQUESTS   │ │  │
         │ [Submit Button]   │  │ │             │ │  │
         └──────────────────┘  │ │ • View      │ │  │
                    │           │ │ • Accept    │ │  │
                    │           │ │ • Reject    │ │  │
           ┌────────▼───────┐   │ └─────────────┘ │  │
           │ Skill Added!   │   │                 │  │
           │ → Back to      │   │ ┌─────────────┐ │  │
           │   Dashboard    │   │ │  SENT       │ │  │
           └────────────────┘   │ │  REQUESTS   │ │  │
                                │ │             │ │  │
                                │ │ • View      │ │  │
                                │ │ • Status    │ │  │
                                │ └─────────────┘ │  │
                                └─────────────────┘  │
                                         │           │
                                         └───────────┘
                                    (Back to Dashboard)
```

---

## 🔄 Data Flow Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Pages   │  │Components│  │  Routes  │  │  Utils   │  │
│  │          │  │          │  │          │  │          │  │
│  │ • Home   │  │ • Layout │  │ • Router │  │ • storage│  │
│  │ • Login  │  │ • Button │  │ • Config │  │   .ts    │  │
│  │ • Dash   │  │ • Card   │  │          │  │          │  │
│  │ • etc... │  │ • etc... │  │          │  │          │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │             │        │
│       └─────────────┴──────────────┴─────────────┘        │
│                            │                               │
└────────────────────────────┼───────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│              DATA LAYER (storage.ts)                       │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ User Ops     │  │ Skill Ops    │  │ Request Ops  │     │
│  │              │  │              │  │              │     │
│  │ • register() │  │ • addSkill() │  │ • send()     │     │
│  │ • login()    │  │ • getSkills()│  │ • update()   │     │
│  │ • logout()   │  │ • filter()   │  │ • getInc()   │     │
│  │ • getCurrent│  │              │  │ • getSent()  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │             │
│         └─────────────────┴──────────────────┘             │
│                            │                               │
└────────────────────────────┼───────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│           PERSISTENCE (Browser localStorage)               │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Key: "users"         │  Key: "skills"    │  Key: "requests"│
│  Array<User>          │  Array<Skill>     │  Array<Request>│
│                       │                   │                │
│  [                    │  [                │  [             │
│    {                  │    {              │    {           │
│      user_id: 1       │      skill_id: 1  │      req_id: 1 │
│      name: "..."      │      user_id: 1   │      sender: 1 │
│      email: "..."     │      name: "..."  │      receiver: 2│
│      ...              │      desc: "..."  │      skill: 1  │
│    }                  │    }              │      status: "P"│
│  ]                    │  ]                │    }           │
│                       │                   │  ]             │
│                                                             │
│  Key: "currentUser"   → Stores logged-in user              │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│ User Visits │
│   Website   │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Check Current    │
│ User in          │
│ localStorage     │
└──────┬───────────┘
       │
       ├─── No User Found ───► ┌────────────────┐
       │                       │ Show: Home     │
       │                       │ Options: Login │
       │                       │         Register│
       │                       └────────────────┘
       │
       └─── User Found ──────► ┌────────────────┐
                               │ Auto-redirect  │
                               │ to Dashboard   │
                               └────────────────┘

LOGIN PROCESS:
┌──────────┐
│ Enter    │
│ Email &  │
│ Password │
└────┬─────┘
     │
     ▼
┌──────────────────┐
│ Validate Against │
│ localStorage     │
│ "users" array    │
└────┬─────────────┘
     │
     ├─── Match Found ──────► ┌──────────────┐
     │                        │ Save user to │
     │                        │ "currentUser"│
     │                        │ → Dashboard  │
     │                        └──────────────┘
     │
     └─── No Match ─────────► ┌──────────────┐
                              │ Show Error   │
                              │ Toast        │
                              └──────────────┘
```

---

## 💼 Skill Sharing Flow

```
USER A: ADDS SKILL
┌─────────────────┐
│ User A          │
│ Goes to         │
│ /add-skill      │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Fills Form:     │
│ • Skill Name    │
│ • Description   │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ storage.ts:     │
│ addSkill()      │
│                 │
│ Creates:        │
│ {               │
│   skill_id: 1   │
│   user_id: A    │
│   name: "React" │
│   desc: "..."   │
│ }               │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Saved to        │
│ localStorage    │
│ "skills" array  │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Redirect to     │
│ Dashboard       │
│ Shows in        │
│ "My Skills"     │
└─────────────────┘

USER B: VIEWS & REQUESTS
┌─────────────────┐
│ User B          │
│ Visits          │
│ Dashboard       │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Loads:          │
│ getOtherUsers   │
│ Skills()        │
│                 │
│ Filters:        │
│ user_id ≠ B     │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Sees User A's   │
│ "React" skill   │
│                 │
│ [Send Request]  │
│     Button      │
└────┬────────────┘
     │ (Click)
     ▼
┌─────────────────┐
│ storage.ts:     │
│ sendRequest()   │
│                 │
│ Creates:        │
│ {               │
│   request_id: 1 │
│   sender_id: B  │
│   receiver_id: A│
│   skill_id: 1   │
│   status: "P"   │
│ }               │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Saved to        │
│ localStorage    │
│ "requests"      │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Toast:          │
│ "Request sent!" │
└─────────────────┘
```

---

## 📨 Request Management Flow

```
USER A: RECEIVES REQUEST
┌─────────────────┐
│ User A          │
│ Goes to         │
│ /requests       │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Loads:          │
│ getIncoming     │
│ Requests(A)     │
│                 │
│ Filters:        │
│ receiver_id = A │
└────┬────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Displays:                        │
│ ┌─────────────────────────────┐ │
│ │ Request for: React           │ │
│ │ From: User B                 │ │
│ │ Department: IT               │ │
│ │ Status: 🟡 Pending          │ │
│ │                              │ │
│ │ [Accept] [Reject]            │ │
│ └─────────────────────────────┘ │
└────┬────────────────────────────┘
     │
     ├──── Accept ────► ┌─────────────────┐
     │                  │ updateRequest   │
     │                  │ Status(1, "A")  │
     │                  └────┬────────────┘
     │                       │
     │                       ▼
     │                  ┌─────────────────┐
     │                  │ Update in       │
     │                  │ localStorage    │
     │                  │ status: "A"     │
     │                  └────┬────────────┘
     │                       │
     │                       ▼
     │                  ┌─────────────────┐
     │                  │ Toast:          │
     │                  │ "Request        │
     │                  │  accepted!"     │
     │                  └─────────────────┘
     │
     └──── Reject ────► ┌─────────────────┐
                        │ updateRequest   │
                        │ Status(1, "R")  │
                        └────┬────────────┘
                             │
                             ▼
                        ┌─────────────────┐
                        │ Update in       │
                        │ localStorage    │
                        │ status: "R"     │
                        └────┬────────────┘
                             │
                             ▼
                        ┌─────────────────┐
                        │ Toast:          │
                        │ "Request        │
                        │  rejected"      │
                        └─────────────────┘

USER B: CHECKS STATUS
┌─────────────────┐
│ User B          │
│ Goes to         │
│ /requests       │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Clicks:         │
│ "Sent" Tab      │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Loads:          │
│ getSentRequests │
│ (B)             │
│                 │
│ Filters:        │
│ sender_id = B   │
└────┬────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Displays:                        │
│ ┌─────────────────────────────┐ │
│ │ Request for: React           │ │
│ │ To: User A                   │ │
│ │ Department: CS               │ │
│ │ Status: ✅ Accepted         │ │
│ │                              │ │
│ │ 🎉 Contact: userA@email.com │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## 🗂️ Database Schema (localStorage)

```
┌─────────────────────────────────────────────────┐
│              USERS TABLE                        │
├─────────────────────────────────────────────────┤
│ user_id (PK)    │ INT, Auto Increment          │
│ name            │ VARCHAR(100)                  │
│ email           │ VARCHAR(100), UNIQUE          │
│ department      │ VARCHAR(100)                  │
│ year            │ INT                           │
│ password        │ VARCHAR(255)                  │
└─────────────────────────────────────────────────┘
                        │
                        │ 1
                        │
                        │ *
┌─────────────────────────────────────────────────┐
│              SKILLS TABLE                       │
├─────────────────────────────────────────────────┤
│ skill_id (PK)   │ INT, Auto Increment          │
│ user_id (FK)    │ INT → users(user_id)         │
│ skill_name      │ VARCHAR(100)                  │
│ description     │ TEXT                          │
└─────────────────────────────────────────────────┘
                        │
                        │ 1
                        │
                        │ *
┌─────────────────────────────────────────────────┐
│             REQUESTS TABLE                      │
├─────────────────────────────────────────────────┤
│ request_id (PK) │ INT, Auto Increment          │
│ sender_id       │ INT → users(user_id)         │
│ receiver_id     │ INT → users(user_id)         │
│ skill_id        │ INT → skills(skill_id)       │
│ status          │ ENUM('P', 'A', 'R')          │
│                 │ P = Pending                   │
│                 │ A = Accepted                  │
│                 │ R = Rejected                  │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Component Hierarchy

```
App.tsx
  │
  ├─ RouterProvider
       │
       └─ Layout
            │
            ├─ Navigation Bar
            │    ├─ Logo
            │    ├─ App Title
            │    └─ Nav Links
            │         ├─ If Logged In:
            │         │    ├─ Dashboard
            │         │    ├─ Add Skill
            │         │    ├─ Requests
            │         │    └─ Logout Button
            │         │
            │         └─ If Not Logged In:
            │              ├─ Login Button
            │              └─ Register Button
            │
            └─ <Outlet> (Page Content)
                 │
                 ├─ HomePage
                 │    ├─ Hero Section
                 │    ├─ Features Cards
                 │    └─ CTA Section
                 │
                 ├─ RegisterPage
                 │    └─ Registration Form
                 │         ├─ Name Input
                 │         ├─ Email Input
                 │         ├─ Department Select
                 │         ├─ Year Select
                 │         └─ Password Input
                 │
                 ├─ LoginPage
                 │    └─ Login Form
                 │         ├─ Email Input
                 │         └─ Password Input
                 │
                 ├─ DashboardPage
                 │    ├─ Profile Card
                 │    ├─ My Skills Section
                 │    │    └─ Skill Cards
                 │    └─ Other Skills Section
                 │         └─ Skill Cards
                 │              └─ Send Request Button
                 │
                 ├─ AddSkillPage
                 │    ├─ Form
                 │    │    ├─ Skill Name Input
                 │    │    └─ Description Textarea
                 │    └─ Tips Section
                 │
                 └─ RequestsPage
                      └─ Tabs
                           ├─ Incoming Tab
                           │    └─ Request Cards
                           │         ├─ Accept Button
                           │         └─ Reject Button
                           │
                           └─ Sent Tab
                                └─ Request Cards
                                     └─ Status Badge
```

---

## ⚡ State Management

```
┌─────────────────────────────────────────────┐
│          GLOBAL STATE                       │
│  (localStorage + React useState)            │
├─────────────────────────────────────────────┤
│                                             │
│  currentUser: User | null                   │
│    └─ Checked on every protected route     │
│                                             │
│  users: User[]                              │
│    └─ All registered users                 │
│                                             │
│  skills: Skill[]                            │
│    └─ All skills from all users            │
│                                             │
│  requests: Request[]                        │
│    └─ All skill requests                   │
│                                             │
└─────────────────────────────────────────────┘
         │
         │ Read/Write Operations
         ▼
┌─────────────────────────────────────────────┐
│        LOCAL COMPONENT STATE                │
│         (React useState)                    │
├─────────────────────────────────────────────┤
│                                             │
│  Pages maintain local state:               │
│    • Form inputs                            │
│    • Loading states                         │
│    • Filtered data                          │
│    • UI toggles                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔔 Notification System

```
┌─────────────┐
│ User Action │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ API Operation    │
│ (storage.ts)     │
└──────┬───────────┘
       │
       ├─── Success ──► ┌─────────────┐
       │                │ toast.      │
       │                │ success()   │
       │                └──────┬──────┘
       │                       │
       │                       ▼
       │                ┌─────────────┐
       │                │ Green Toast │
       │                │ Top-Center  │
       │                │ Auto-dismiss│
       │                └─────────────┘
       │
       └─── Error ────► ┌─────────────┐
                        │ toast.      │
                        │ error()     │
                        └──────┬──────┘
                               │
                               ▼
                        ┌─────────────┐
                        │ Red Toast   │
                        │ Top-Center  │
                        │ Auto-dismiss│
                        └─────────────┘
```

---

**END OF APPLICATION FLOW DOCUMENTATION**

This document provides a complete visual understanding of how the Campus Skill Exchange Platform works! 🎓✨
