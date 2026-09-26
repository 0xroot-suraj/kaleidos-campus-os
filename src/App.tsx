import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AppShell from './layouts/AppShell';
import { MOCK_USERS } from './data/mockData';

import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Timetable from './pages/Timetable';
import Events from './pages/Events';
import LostLoop from './pages/LostLoop';
import FixMyCampus from './pages/FixMyCampus';
import CampusNavigator from './pages/CampusNavigator';
import Academics from './pages/Academics';
import Teachers from './pages/Teachers';
import CampusFeed from './pages/CampusFeed';
import UniVault from './pages/UniVault';
import UsersList from './pages/UsersList';
import Profile from './pages/Profile';
import StaffEvents from './pages/StaffEvents';
import AdminEvents from './pages/AdminEvents';
function App() {
  const allUsers = Object.values(MOCK_USERS);
  const students = allUsers.filter(u => u.role === 'student');

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><AppShell /></ProtectedRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="academics" element={<Academics />} />
            <Route path="events" element={<Events />} />
            <Route path="lostloop" element={<LostLoop />} />
            <Route path="fixmycampus" element={<FixMyCampus />} />
            <Route path="navigator" element={<CampusNavigator />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="campusfeed" element={<CampusFeed />} />
            <Route path="univault" element={<UniVault />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/student" replace />} />
          </Route>
          
          <Route path="/staff" element={<ProtectedRoute allowedRoles={['staff']}><AppShell /></ProtectedRoute>}>
            <Route index element={<StaffDashboard />} />
            <Route path="classes" element={<Timetable />} />
            <Route path="events" element={<StaffEvents />} />
            <Route path="issues" element={<FixMyCampus />} />
            <Route path="students" element={<UsersList title="My Students" subtitle="Manage your enrolled students." users={students} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/staff" replace />} />
          </Route>
          
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AppShell /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersList title="User Directory" subtitle="Manage system users." users={allUsers} />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="issues" element={<FixMyCampus />} />
            <Route path="facilities" element={<CampusNavigator />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
