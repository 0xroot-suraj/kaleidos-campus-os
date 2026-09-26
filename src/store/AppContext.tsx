import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, Role, EventItem, EventStatus, Ticket, LostItem, NotificationItem } from '../data/mockData';
import { MOCK_USERS, MOCK_EVENTS, MOCK_TICKETS, MOCK_LOST_LOOP, MOCK_NOTIFICATIONS } from '../data/mockData';

interface AppContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  
  // Events
  events: EventItem[];
  createEvent: (event: EventItem) => void;
  updateEventStatus: (id: string, status: EventStatus, feedback?: string) => void;
  registerEvent: (id: string) => void;
  
  // Tickets
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, status: Ticket['status']) => void;
  
  // LostLoop
  lostItems: LostItem[];
  addLostItem: (item: LostItem) => void;
  resolveLostItem: (id: string) => void;
  updateItemStatus: (id: string, status: LostItem['status']) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
  markNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [lostItems, setLostItems] = useState<LostItem[]>(MOCK_LOST_LOOP);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const login = (role: Role) => setUser(MOCK_USERS[role]);
  const logout = () => setUser(null);

  // Events
  const createEvent = (event: EventItem) => {
    setEvents(prev => [event, ...prev]);
    if (event.status === 'Pending Approval') {
      addNotification({ title: 'New Event Request', message: `${event.title} is waiting for approval.`, targetRole: 'admin' });
    }
  };

  const updateEventStatus = (id: string, status: EventStatus, feedback?: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        if (status === 'Published') {
          addNotification({ title: 'Event Published', message: `${e.title} is now live!`, targetRole: 'student' });
          addNotification({ title: 'Event Approved', message: `${e.title} was approved.`, targetRole: 'staff' });
        } else if (status === 'Changes Requested') {
          addNotification({ title: 'Changes Requested', message: `Admin requested changes for ${e.title}.`, targetRole: 'staff' });
        }
        return { ...e, status, feedback: feedback || e.feedback };
      }
      return e;
    }));
  };

  const registerEvent = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        addNotification({ title: 'New Registration', message: `${user?.name} registered for ${e.title}.`, targetRole: 'staff' });
        return { ...e, isRegistered: true, registered: e.registered + 1 };
      }
      return e;
    }));
  };

  // Tickets
  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
    addNotification({ title: 'New Issue Reported', message: `${ticket.title} at ${ticket.location}`, targetRole: 'staff' });
    addNotification({ title: 'New Issue Reported', message: `${ticket.title} at ${ticket.location}`, targetRole: 'admin' });
  };

  const updateTicketStatus = (id: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        if (status === 'Resolved') {
          addNotification({ title: 'Issue Resolved', message: `Your ticket ${t.id} has been resolved.`, targetRole: 'student' });
        }
        return { ...t, status };
      }
      return t;
    }));
  };

  // LostLoop
  const addLostItem = (item: LostItem) => setLostItems(prev => [item, ...prev]);
  const resolveLostItem = (id: string) => setLostItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Resolved' } : i));
  const updateItemStatus = (id: string, status: LostItem['status']) => setLostItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));

  // Notifications
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout,
      events, createEvent, updateEventStatus, registerEvent,
      tickets, addTicket, updateTicketStatus,
      lostItems, addLostItem, resolveLostItem, updateItemStatus,
      notifications, addNotification, markNotificationsRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}
