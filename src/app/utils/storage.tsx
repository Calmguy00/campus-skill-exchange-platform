// Simple storage utility to simulate backend database
// This uses localStorage for persistence

export interface User {
  user_id: number;
  name: string;
  email: string;
  department: string;
  year: number;
  password: string;
}

export interface Skill {
  skill_id: number;
  user_id: number;
  skill_name: string;
  description: string;
}

export interface Request {
  request_id: number;
  sender_id: number;
  receiver_id: number;
  skill_id: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

// Initialize storage with empty arrays if not exists
const initStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('skills')) {
    localStorage.setItem('skills', JSON.stringify([]));
  }
  if (!localStorage.getItem('requests')) {
    localStorage.setItem('requests', JSON.stringify([]));
  }
  if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', '');
  }
};

initStorage();

// User operations
export const registerUser = (user: Omit<User, 'user_id'>): { success: boolean; message: string; user?: User } => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if email already exists
  if (users.find(u => u.email === user.email)) {
    return { success: false, message: 'Email already registered' };
  }
  
  const newUser: User = {
    ...user,
    user_id: users.length > 0 ? Math.max(...users.map(u => u.user_id)) + 1 : 1,
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true, message: 'Registration successful', user: newUser };
};

export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: User } => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, message: 'Login successful', user };
  }
  
  return { success: false, message: 'Invalid email or password' };
};

export const logoutUser = () => {
  localStorage.setItem('currentUser', '');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  if (userStr && userStr !== '') {
    return JSON.parse(userStr);
  }
  return null;
};

// Skill operations
export const addSkill = (skill: Omit<Skill, 'skill_id'>): { success: boolean; message: string; skill?: Skill } => {
  const skills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  
  const newSkill: Skill = {
    ...skill,
    skill_id: skills.length > 0 ? Math.max(...skills.map(s => s.skill_id)) + 1 : 1,
  };
  
  skills.push(newSkill);
  localStorage.setItem('skills', JSON.stringify(skills));
  
  return { success: true, message: 'Skill added successfully', skill: newSkill };
};

export const getAllSkills = (): Skill[] => {
  return JSON.parse(localStorage.getItem('skills') || '[]');
};

export const getUserSkills = (userId: number): Skill[] => {
  const skills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  return skills.filter(s => s.user_id === userId);
};

export const getOtherUsersSkills = (userId: number): Skill[] => {
  const skills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  return skills.filter(s => s.user_id !== userId);
};

// Request operations
export const sendRequest = (request: Omit<Request, 'request_id' | 'status'>): { success: boolean; message: string } => {
  const requests: Request[] = JSON.parse(localStorage.getItem('requests') || '[]');
  
  // Check if request already exists
  const exists = requests.find(
    r => r.sender_id === request.sender_id && 
         r.receiver_id === request.receiver_id && 
         r.skill_id === request.skill_id &&
         r.status === 'Pending'
  );
  
  if (exists) {
    return { success: false, message: 'Request already sent' };
  }
  
  const newRequest: Request = {
    ...request,
    request_id: requests.length > 0 ? Math.max(...requests.map(r => r.request_id)) + 1 : 1,
    status: 'Pending',
  };
  
  requests.push(newRequest);
  localStorage.setItem('requests', JSON.stringify(requests));
  
  return { success: true, message: 'Request sent successfully' };
};

export const updateRequestStatus = (requestId: number, status: 'Accepted' | 'Rejected'): { success: boolean; message: string } => {
  const requests: Request[] = JSON.parse(localStorage.getItem('requests') || '[]');
  const requestIndex = requests.findIndex(r => r.request_id === requestId);
  
  if (requestIndex === -1) {
    return { success: false, message: 'Request not found' };
  }
  
  requests[requestIndex].status = status;
  localStorage.setItem('requests', JSON.stringify(requests));
  
  return { success: true, message: `Request ${status.toLowerCase()}` };
};

export const getIncomingRequests = (userId: number): Request[] => {
  const requests: Request[] = JSON.parse(localStorage.getItem('requests') || '[]');
  return requests.filter(r => r.receiver_id === userId);
};

export const getSentRequests = (userId: number): Request[] => {
  const requests: Request[] = JSON.parse(localStorage.getItem('requests') || '[]');
  return requests.filter(r => r.sender_id === userId);
};

export const getUserById = (userId: number): User | undefined => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.user_id === userId);
};

export const getSkillById = (skillId: number): Skill | undefined => {
  const skills: Skill[] = JSON.parse(localStorage.getItem('skills') || '[]');
  return skills.find(s => s.skill_id === skillId);
};
