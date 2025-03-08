export interface UserType {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoading: boolean;
}

export interface EmailType {
  userEmail: string;
}
