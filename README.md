<div align="center">
  <img src="https://i.imgur.com/Kz657tL.png" alt="KALÉIDOS Logo" width="120" />
  <h1>KALÉIDOS</h1>
  <p><strong>The Intelligent Campus Operating System</strong></p>
  <p><em>One campus. One command center.</em></p>
</div>

<br />

> **⚠️ HACKATHON PROTOTYPE NOTICE:**  
> This project is a **frontend-only interactive prototype** developed for demonstration purposes. It does not possess a live backend database. Instead, it utilizes an advanced React Context architecture to simulate a centralized database (`mockData.ts`). All data transitions, event approvals, issue resolutions, and notifications are processed dynamically in-memory and persist for the duration of the browser session.

---

## 🚨 The Problem: A Fragmented Campus Experience

Modern universities are digital nightmares. Students and staff are forced to navigate a labyrinth of disconnected, outdated legacy systems just to survive a typical day. 

- **Academics** live on a learning management system (LMS).
- **Events and Club Activities** are scattered across WhatsApp groups and Instagram stories.
- **Timetables and Exams** are sent as static PDFs via email.
- **Maintenance Issues** (like a broken projector or AC) are reported through obscure IT portals that nobody checks.
- **Campus Navigation** relies entirely on asking seniors for directions.

The result? Missed opportunities, operational bottlenecks, frustrated students, and blind-spotted administrators. The university experience is broken because the tools used to manage it are isolated from one another.

---

## 💡 The Solution: KALÉIDOS

**KALÉIDOS is not just another dashboard; it is a unified Campus Operating System.** 

By treating the university as a single, living ecosystem, KALÉIDOS unifies every aspect of campus life into one premium, highly interactive, and intuitive platform. It bridges the gap between **Students (who participate)**, **Staff (who operate)**, and **Admins (who govern)** through real-time, interconnected workflows.

If a student reports a broken projector, a staff member is instantly notified to fix it, and the admin sees it on the live Campus Command Center map. If a professor creates a seminar, it goes to the admin for approval, and is instantly pushed to the students' event feeds. **Everything is connected.**

---

## 🎯 Key Features by Role

### 🎓 1. Student (Participate)
*The Ultimate Personal Campus Assistant.*
- **CampusFeed & Events:** Discover and register for upcoming workshops, hackathons, and seminars. (Only displays 'Published' events).
- **Interactive Timetable:** Toggle between Day/Week views with live class tracking.
- **FixMyCampus:** Snap a picture and report a campus issue. Receive a live notification when maintenance resolves it.
- **LostLoop:** A centralized, live-updating lost-and-found board for the university.
- **Campus Navigator:** An interactive map with live route estimations to classrooms and facilities.

### 👔 2. Staff (Operate)
*The Operational Workspace.*
- **My Classes & Roster:** View class details, attendance averages, and upcoming assignments at a glance.
- **Event Organizer Console:** Create events and submit them for university approval. Monitor live registration capacities.
- **Quick Announcements:** Push targeted announcements to specific student sections instantly.
- **Assigned Issues:** Receive and manage FixMyCampus tickets assigned to your department. Change statuses from 'In Progress' to 'Resolved'.

### 🏛️ 3. Admin (Govern)
*The Campus Command Center.*
- **Live Campus Pulse:** Monitor real-time building occupancy, active events, and facility health (Wi-Fi, AC, Power) on an interactive map.
- **Event Approval Center:** Review, approve, or request changes on events submitted by staff to ensure quality control.
- **Incident Center:** A timeline view of all active campus issues and operational bottlenecks.
- **System Governance:** Manage users, roles, permissions, and the global academic calendar.

---

## 🔄 Cross-Role Workflows (Interactive Demo)

KALÉIDOS is built on the philosophy that an action by one role must have consequences for another. This is fully demonstrable in the prototype:

1. **The Event Lifecycle Demo:** 
   `Staff creates Event` ➔ `Status: Pending` ➔ `Admin Reviews & Approves` ➔ `Status: Published` ➔ `Student Receives Notification & Registers` ➔ `Staff sees Registration Count Increase`.
   
2. **The Incident Lifecycle Demo:** 
   `Student reports broken AC` ➔ `Status: Reported` ➔ `Staff marks In Progress` ➔ `Admin sees facility warning on Campus Pulse` ➔ `Staff marks Resolved` ➔ `Student gets 'Issue Resolved' notification`.

---

## 📂 Project Structure

```text
KALÉIDOS/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Modals, AI Assistant)
│   ├── data/
│   │   └── mockData.ts     # Centralized demo data simulating a live database
│   ├── layouts/
│   │   └── AppShell.tsx    # Master layout controlling dynamic sidebars & notifications
│   ├── pages/              # Role-specific dashboard views and features
│   │   ├── AdminDashboard.tsx
│   │   ├── StaffDashboard.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── FixMyCampus.tsx
│   │   ├── Events.tsx
│   │   └── ...
│   ├── store/
│   │   └── AppContext.tsx  # Global state manager bridging the 3 roles together
│   ├── App.tsx             # React Router handling protected role-based routes
│   └── main.tsx            # Application entry point
├── tailwind.config.js      # Custom design system tokens
└── package.json            # Dependencies and scripts
```

---

## 🛠️ Tech Stack

This project was built with a modern, high-performance frontend stack:

- **Framework:** React 19 + Vite
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 (Custom UI/UX Design System)
- **Animations:** Framer Motion (Micro-interactions, page transitions, interactive modals)
- **Icons:** Lucide React
- **Routing:** React Router v7
- **State Management:** React Context API (Interconnected mock database simulating full CRUD operations across roles)

---

## 🚀 How to Run Locally

To test the interactive role-based prototype on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kaleidos.git
   cd kaleidos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Experience the OS**
   Open `http://localhost:5173`. 
   
   **Demo Instructions:** Use the mock login page to switch freely between the **Student**, **Staff**, and **Admin** roles. Try creating an event as a Staff member, logging out, logging in as an Admin to approve it, and logging in as a Student to register for it!

---

> *"Designed to be breathtaking. Engineered to be effortless."*  
> **— The KALÉIDOS Team**
