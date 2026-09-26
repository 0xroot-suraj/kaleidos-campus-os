export type Role = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export const MOCK_USERS: Record<Role, User> = {
  student: {
    id: 'u_student_1',
    name: 'Shakti Mohapatra',
    email: 'student@kaleidos.demo',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=student1'
  },
  staff: {
    id: 'u_staff_1',
    name: 'Dr. Ananya Sharma',
    email: 'faculty@kaleidos.demo',
    role: 'staff',
    avatar: 'https://i.pravatar.cc/150?u=staff1'
  },
  admin: {
    id: 'u_admin_1',
    name: 'Campus Admin',
    email: 'admin@kaleidos.demo',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin1'
  }
};

export type EventStatus = 'Draft' | 'Pending Approval' | 'Changes Requested' | 'Approved' | 'Published' | 'Completed' | 'Rejected';

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  category: string;
  capacity: number;
  registered: number;
  isRegistered?: boolean;
  status: EventStatus;
  feedback?: string;
}

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt_1',
    title: 'AI Workshop',
    organizer: 'CSE Department',
    date: 'Tomorrow',
    time: '2:00 PM',
    venue: 'Auditorium',
    location: 'Auditorium',
    description: 'Learn the basics of AI and machine learning.',
    category: 'Workshops',
    capacity: 200,
    registered: 148,
    isRegistered: true,
    status: 'Published'
  },
  {
    id: 'evt_2',
    title: 'Hackathon 2026',
    organizer: 'Tech Club',
    date: 'Friday',
    time: '10:00 AM',
    venue: 'Campus 6 Main Hall',
    location: 'Campus 6 Main Hall',
    description: 'Annual hackathon with amazing prizes.',
    category: 'Hackathons',
    capacity: 500,
    registered: 450,
    isRegistered: true,
    status: 'Published'
  },
  {
    id: 'evt_3',
    title: 'Photography Walk',
    organizer: 'Creative Society',
    date: 'Sunday',
    time: '5:30 PM',
    venue: 'Main Gate',
    location: 'Main Gate',
    description: 'Explore the campus and take beautiful photos.',
    category: 'Clubs',
    capacity: 50,
    registered: 35,
    isRegistered: true,
    status: 'Published'
  },
  {
    id: 'evt_4',
    title: 'Robotics Seminar',
    organizer: 'Robotics Club',
    date: 'Next Tuesday',
    time: '3:00 PM',
    venue: 'Campus 3, Room 201',
    location: 'Campus 3, Room 201',
    description: 'Introductory seminar on robotics engineering.',
    category: 'Seminars',
    capacity: 100,
    registered: 80,
    isRegistered: false,
    status: 'Published'
  }
];

export interface ClassItem {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  duration: string;
  campus: string;
  room: string;
  status: 'upcoming' | 'current' | 'completed';
}

export const MOCK_STUDENT_CLASSES: ClassItem[] = [
  {
    id: 'cls_1',
    subject: 'Data Structures',
    teacher: 'Dr. Ananya Sharma',
    time: '2:00 PM',
    duration: '2:00 PM — 3:00 PM',
    campus: 'Campus 6',
    room: 'Room 402',
    status: 'upcoming'
  },
  {
    id: 'cls_2',
    subject: 'Algorithms',
    teacher: 'Prof. J. Doe',
    time: '11:00 AM',
    duration: '11:00 AM — 12:00 PM',
    campus: 'Campus 3',
    room: 'Room 301',
    status: 'completed'
  }
];

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetRole?: Role | 'all';
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif_1', title: 'Room Change', message: 'Your class Data Structures moved to Room 405.', time: '10m ago', read: false, targetRole: 'student' },
  { id: 'notif_2', title: 'Registration Confirmed', message: 'AI Workshop registration confirmed.', time: '1h ago', read: true, targetRole: 'student' },
  { id: 'notif_3', title: 'System Update', message: 'KALÉIDOS will be down for maintenance at 2 AM.', time: '2h ago', read: true, targetRole: 'all' }
];

export const MOCK_LIBRARY = {
  total: 300,
  occupied: 127,
  quietZoneOccupancy: 62
};

export const MOCK_CAMPUS_METRICS = {
  students: 12482,
  staff: 684,
  activeEvents: 143,
  openIssues: 27,
  libraryVisitors: 1284,
  campusHealth: 92
};

export interface Ticket {
  id: string;
  title: string;
  category: string;
  location: string;
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}

export const MOCK_TICKETS: Ticket[] = [
  { id: 'FM-204', title: 'Projector malfunction', category: 'Projector', location: 'Campus 6, Room 402', status: 'In Progress', priority: 'High', date: 'Today, 9:00 AM' },
  { id: 'FM-205', title: 'Wi-Fi dropouts', category: 'Wi-Fi', location: 'Library 2nd Floor', status: 'Reported', priority: 'Medium', date: 'Today, 10:30 AM' },
  { id: 'FM-190', title: 'Broken chair', category: 'Furniture', location: 'Campus 3, Room 101', status: 'Resolved', priority: 'Low', date: 'Yesterday' }
];

export interface LostItem {
  id: string;
  item: string;
  title: string;
  category: string;
  contact: string;
  description: string;
  location: string;
  date: string;
  type: 'lost' | 'found';
  status: 'Active' | 'Resolved';
}

export const MOCK_LOST_LOOP: LostItem[] = [
  { id: 'll_1', title: 'Apple AirPods Pro', item: 'Apple AirPods Pro', category: 'Electronics', contact: 'John Doe', description: 'Black charging case, left bud missing.', location: 'Near Campus 6', date: 'Sep 25', type: 'lost', status: 'Active' },
  { id: 'll_2', title: 'Water Bottle', item: 'Water Bottle', category: 'Accessories', contact: 'Jane Smith', description: 'Blue hydroflask with stickers', location: 'Library', date: 'Sep 24', type: 'found', status: 'Active' },
  { id: 'll_3', title: 'Calculator', item: 'Calculator', category: 'Electronics', contact: 'Alice Johnson', description: 'Casio Scientific', location: 'Exam Hall A', date: 'Sep 20', type: 'lost', status: 'Resolved' }
];
