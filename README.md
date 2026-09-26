<div align="center">

# KALÉIDOS

### The Intelligent Campus Operating System

**One campus. One command center.**

<p>
A unified digital platform connecting students, staff, and university administration through one intelligent campus experience.
</p>

</div>

---

> ⚠️ **HACKATHON PROTOTYPE**
>
> KALÉIDOS is a **frontend-only interactive prototype** created for a university hackathon. It uses centralized mock data and React state to simulate authentication, database operations, approvals, notifications, analytics, and cross-role workflows.
>
> There is currently **no production backend, database, or external authentication service**.

---

# 🚨 The Problem

Modern university experiences are fragmented across disconnected systems.

Students and staff often have to jump between:

* Learning Management Systems
* static timetable PDFs
* WhatsApp groups
* Instagram pages
* separate event portals
* outdated complaint systems
* email announcements
* disconnected university ERP systems
* physical notice boards

A broken projector might be reported through one system, an event announced somewhere else, and a timetable change communicated through a WhatsApp group.

The result is:

**missed opportunities → poor communication → operational bottlenecks → fragmented campus experiences**

The university doesn't necessarily need more software.

It needs **one connected operating layer.**

---

# 💡 The Solution

## KALÉIDOS

KALÉIDOS is a **Campus Operating System** designed to unify the digital campus experience.

Instead of treating academics, events, infrastructure, communication, and campus services as separate systems, KALÉIDOS connects them through a shared platform.

### Three perspectives. One campus.

| Role           | Purpose     |
| -------------- | ----------- |
| 🎓 **Student** | Participate |
| 👔 **Staff**   | Operate     |
| 🏛️ **Admin**  | Govern      |

The result is a connected campus ecosystem where actions in one role can create meaningful changes in another.

---

# ✨ Core Features

## 🎓 Student — Participate

KALÉIDOS acts as a personal campus assistant for students.

### Dashboard

A personalized campus command center showing:

* next class
* timetable
* library availability
* exam countdown
* upcoming registered events
* campus announcements
* weather
* notifications
* quick campus actions

### 📅 Smart Timetable

* day and week views
* upcoming class highlighting
* room and building information
* faculty information
* current-class tracking

### 🎟️ Campus Events

Discover:

* hackathons
* workshops
* seminars
* competitions
* cultural events
* technical events
* university events
* club activities

Students can register for published events and track their registrations.

### 🔎 LostLoop

A unified campus lost-and-found system.

Students can:

* report lost items
* report found items
* browse posts
* view locations
* contact relevant users
* mark items as resolved

### 🛠️ FixMyCampus

Report campus problems such as:

* broken projectors
* AC issues
* Wi-Fi problems
* classroom maintenance
* lighting
* furniture
* cleanliness
* accessibility issues

Students can track their issue through:

```text
Reported
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
```

### 🗺️ Campus Navigator

An interactive campus map showing:

* academic buildings
* labs
* library
* auditorium
* sports facilities
* gates
* other campus locations

The prototype can simulate routes and walking estimates.

### 🤖 Ask KALÉIDOS

A built-in campus assistant that can answer contextual questions such as:

> Where is my next class?

> What events am I registered for?

> When is my next exam?

> I lost my AirPods.

Responses are powered by predefined prototype logic and centralized mock data.

---

# 👔 Staff — Operate

Staff have a dedicated **Campus Operations Workspace**.

Unlike students, staff are responsible for managing the academic and operational activities assigned to them.

### 📚 My Classes

Staff can view:

* today's classes
* weekly schedule
* subjects
* sections
* classrooms
* student counts
* attendance overview

### 👥 Student Roster

Faculty can view students in their assigned classes.

Includes:

* name
* roll number
* section
* attendance
* basic academic information

### 📢 Class Announcements

Staff can publish announcements targeted to:

* classes
* sections
* subjects
* event attendees

Published announcements can appear in the relevant student notifications.

### 📄 Academic Resources

Staff can manage simulated:

* notes
* resources
* assignments
* deadlines

### 🎟️ Event Organizer Console

Staff can:

* create events
* edit events
* submit events for approval
* monitor registrations
* view attendee counts
* simulate attendance
* view feedback
* manage event information

### 🏫 Rooms & Resources

Staff can view campus resources such as:

* classrooms
* laboratories
* auditorium
* seminar halls
* projectors
* microphones
* event equipment

They can also submit resource requests to administration.

### 🛠️ Assigned Issues

Staff can manage FixMyCampus issues assigned to their department.

They can move tickets through:

```text
Reported
   ↓
In Progress
   ↓
Resolved
```

### 📊 Staff Insights

Staff receive analytics relevant to their own responsibilities, such as:

* class attendance
* assignment completion
* event registrations
* event attendance
* event feedback

---

# 🏛️ Admin — Govern

The Admin experience is designed as a **Campus Command Center**.

Instead of managing individual activities only, administrators get a university-wide view.

## 📡 Campus Pulse

A centralized operational overview displaying simulated live campus information:

* active students
* faculty and staff
* active events
* open issues
* library occupancy
* facility health
* active alerts

Example:

```text
12,482
Students

684
Faculty & Staff

143
Active Events

27
Open Issues

1,284
Library Visitors

92%
Campus Services Health
```

---

# 🗺️ Live Campus Operations Map

Administrators can inspect campus facilities through an interactive map.

Buildings can display:

🟢 Operational
🟡 Warning
🔴 Critical

Selecting a building can show:

* occupancy
* active issues
* classes
* events
* facilities
* operational status

Example:

```text
CAMPUS 6

Occupancy       72%
Open Issues     3
Classes Today   48
Events Today    2

Wi-Fi           🟢
AC              🟡
Power           🟢
Security        🟢
```

---

# 🎟️ Event Approval Center

Staff-created university events do **not** become public immediately.

They follow an approval workflow:

```text
Staff
  ↓
Create Event
  ↓
Submit for Approval
  ↓
Pending Review
  ↓
Admin
  ↓
Approve
  ↓
Published
  ↓
Students
```

Administrators can:

* approve events
* request changes
* reject events
* publish events
* cancel events
* inspect event details

If changes are requested:

```text
Pending
   ↓
Changes Requested
   ↓
Resubmitted
   ↓
Admin Review
   ↓
Approved
   ↓
Published
```

This creates a realistic organizational workflow between Staff and Administration.

---

# 🚨 Incident Center

Administrators can monitor operational incidents separately from normal student complaints.

Example:

```text
🔴 High
Power outage — Campus 3

🟡 Medium
Wi-Fi disruption — Campus 6

🟢 Resolved
Water issue — Academic Block
```

Each incident has a lifecycle:

```text
Reported
   ↓
Verified
   ↓
Assigned
   ↓
In Progress
   ↓
Resolved
```

---

# 👥 User & Role Management

Administrators can manage simulated:

### Students

* department
* year
* section
* status

### Staff

* department
* role
* assigned courses
* permissions
* availability

### Clubs

* coordinators
* membership
* status
* events

---

# 🔐 Role & Permission Management

KALÉIDOS demonstrates role-based access control through the frontend.

Example:

| Capability                    | Student |  Staff  | Admin |
| ----------------------------- | :-----: | :-----: | :---: |
| Register for events           |    ✅    |    ✅    |   ✅   |
| Create events                 |    ❌    |    ✅    |   ✅   |
| Submit events                 |    ❌    |    ✅    |   ✅   |
| Approve events                |    ❌    |    ❌    |   ✅   |
| Publish events directly       |    ❌    |    ❌    |   ✅   |
| Create issues                 |    ✅    |    ✅    |   ✅   |
| Resolve assigned issues       |    ❌    |    ✅    |   ✅   |
| Assign issues                 |    ❌    |    ❌    |   ✅   |
| Class announcements           |    ❌    |    ✅    |   ✅   |
| University-wide announcements |    ❌    |    ❌    |   ✅   |
| Modify academic calendar      |    ❌    |    ❌    |   ✅   |
| Manage users                  |    ❌    |    ❌    |   ✅   |
| Manage facilities             | Limited | Limited |   ✅   |
| View campus-wide analytics    |    ❌    |    ❌    |   ✅   |

---

# 📅 Academic Calendar

Administrators can manage the university academic calendar:

* semester dates
* mid-semester exams
* end-semester exams
* holidays
* registration deadlines
* academic deadlines

Student dashboard countdowns can update based on this centralized state.

---

# 📊 University Analytics

Administrators can view simulated analytics covering:

### Academics

* attendance
* enrollment
* exams
* department distribution

### Campus

* library utilization
* room utilization
* facility usage

### Events

* registrations
* attendance
* popularity
* club activity

### Issues

* issue categories
* resolution times
* operational status

### Engagement

* event participation
* club activity
* LostLoop activity
* campus interactions

---

# 🔄 Cross-Role Workflows

One of the defining ideas behind KALÉIDOS is:

> **An action performed by one role should have consequences for another role.**

The prototype demonstrates this using shared React state and centralized mock data.

---

## 🎟️ Event Lifecycle

```text
Staff creates event
        ↓
Pending Approval
        ↓
Admin reviews
        ↓
Admin approves
        ↓
Event becomes Published
        ↓
Student discovers event
        ↓
Student registers
        ↓
Staff sees registration increase
        ↓
Admin sees event analytics
```

---

## 🛠️ Incident Lifecycle

```text
Student reports broken AC
        ↓
Issue becomes Reported
        ↓
Staff receives assigned issue
        ↓
Staff marks In Progress
        ↓
Admin sees facility warning
        ↓
Staff marks Resolved
        ↓
Student receives notification
```

---

## 🏫 Resource Workflow

```text
Staff requests room/equipment
        ↓
Admin reviews request
        ↓
Approved
        ↓
Resource becomes reserved
```

---

## 📅 Academic Workflow

```text
Admin changes exam date
        ↓
Student countdown updates
        ↓
Staff schedule updates
        ↓
Relevant notification appears
```

---

# 🤖 KALÉIDOS AI

KALÉIDOS includes a prototype campus assistant designed around contextual campus information.

Example:

### Student

> Where is my next class?

### KALÉIDOS

> Your next class is **Data Structures at 2:00 PM in Campus 6, Room 402.**

---

### Student

> What events am I registered for?

### KALÉIDOS

> You have 3 upcoming registrations this week.

---

### Student

> I lost my AirPods.

### KALÉIDOS

> I found 2 recent LostLoop reports that may match your item.

The current implementation uses predefined frontend logic rather than a production AI API.

---

# 🧠 Architecture

The prototype is designed around the concept of a shared campus data layer.

```text
                         KALÉIDOS
                            │
             ┌──────────────┼──────────────┐
             │              │              │
          STUDENT          STAFF          ADMIN
             │              │              │
        Participate       Operate        Govern
             │              │              │
             └──────────────┼──────────────┘
                            │
                    Shared Campus State
                            │
                    Centralized Mock Data
```

This allows actions from one role to influence another role during the demonstration.

---

# 📂 Project Structure

```text
KALÉIDOS/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── typescript.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── AIAssistant.tsx
│   │   ├── CommandPalette.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── layouts/
│   │   └── AppShell.tsx
│   │
│   ├── pages/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminEvents.tsx
│   │   ├── CampusFeed.tsx
│   │   ├── CampusNavigator.tsx
│   │   ├── Events.tsx
│   │   ├── FixMyCampus.tsx
│   │   ├── Login.tsx
│   │   ├── LostLoop.tsx
│   │   ├── StaffDashboard.tsx
│   │   ├── StaffEvents.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── Teachers.tsx
│   │   ├── Timetable.tsx
│   │   ├── UniVault.tsx
│   │   └── ...
│   │
│   ├── store/
│   │   └── AppContext.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
│
├── cleanup.cjs
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🛠️ Tech Stack

| Technology               | Purpose                     |
| ------------------------ | --------------------------- |
| **React 19**             | Frontend framework          |
| **Vite**                 | Development & build tooling |
| **TypeScript**           | Type-safe development       |
| **Tailwind CSS v4**      | Styling & design system     |
| **Framer Motion**        | Animations & transitions    |
| **Lucide React**         | Icon system                 |
| **React Router v7**      | Routing                     |
| **React Context API**    | Shared application state    |
| **Mock TypeScript Data** | Simulated campus database   |

---

# 🎨 Design Philosophy

KALÉIDOS is designed to feel more like a modern product than a traditional university ERP.

The interface takes inspiration from the design principles of:

* Apple
* Linear
* Notion
* Vercel
* Stripe
* modern operating systems

Key design principles:

* strong visual hierarchy
* generous whitespace
* responsive layouts
* purposeful animation
* contextual information
* minimal visual clutter
* meaningful micro-interactions
* role-specific experiences

---

# 🔑 Demo Credentials

The prototype uses simulated authentication.

### 🎓 Student

```text
Email:    student@kaleidos.demo
Password: student123
```

### 👔 Staff

```text
Email:    faculty@kaleidos.demo
Password: staff123
```

### 🏛️ Admin

```text
Email:    admin@kaleidos.demo
Password: admin123
```

These are **fictional demonstration credentials** and do not authenticate against a real service.

---

# 🚀 Running Locally

## 1. Clone the repository

```bash
git clone https://github.com/0xroot-suraj/kaleidos-campus-os.git
cd kaleidos-campus-os
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the development server

```bash
npm run dev
```

## 4. Open the application

Visit:

```text
http://localhost:5173
```

---

# 🎬 Recommended Demo Flow

For the strongest demonstration:

### 1. Login as Staff

Create:

**AI Workshop**

Submit it for approval.

### 2. Login as Admin

Open:

**Event Approval Center**

Approve the event.

### 3. Login as Student

Discover:

**AI Workshop**

Register.

### 4. Return to Staff

Show the updated registration count.

### 5. Login as Student

Report:

**Broken AC — Campus 6**

### 6. Login as Staff

Move the issue:

```text
Reported → In Progress
```

### 7. Login as Admin

Show the issue appearing in:

**Campus Pulse / Incident Center**

### 8. Return to Staff

Move:

```text
In Progress → Resolved
```

### 9. Login as Student

Show:

> ✓ Your issue has been resolved.

This demonstrates the central concept of KALÉIDOS:

> **One action. Multiple connected campus experiences.**

---

# 🧪 Prototype Limitations

This project is intentionally a frontend-only hackathon prototype.

Currently:

* authentication is simulated
* data is mocked
* no production database exists
* no production API exists
* AI responses are simulated
* campus navigation is simulated
* weather data is mocked
* notifications are frontend-generated
* operational statistics are demonstration data

The architecture is intentionally designed so these components could later be replaced with real backend services.

---

# 🔮 Future Roadmap

Potential production extensions include:

* real university ERP integration
* PostgreSQL / Supabase backend
* real authentication and RBAC
* real-time WebSocket updates
* AI-powered campus assistant
* real campus maps and navigation
* IoT-based facility monitoring
* actual library occupancy sensors
* university SSO
* mobile applications
* push notifications
* automated event recommendations
* intelligent issue routing
* analytics and predictive maintenance

---

# 🏆 Why KALÉIDOS?

Universities don't necessarily need another isolated application.

They need a **connected operating layer**.

KALÉIDOS brings together:

**People + Places + Academics + Events + Infrastructure + Communication + Campus Services**

into one unified experience.

> **One campus. One command center.**

---

<div align="center">

### KALÉIDOS

**Designed to be breathtaking. Engineered to be effortless.**

Built as a university hackathon prototype.

</div>
