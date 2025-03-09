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

export interface NewCarVariantType {
  name: string;
  price: number;
  image: string;
  reviews: Array<{ rating: number; comment: string }>;
  transmission: string;
  engine: string;
  mileage: number;
  fuelType: string;
  colors: Array<{ name: string; hex: string }>;
  deliveryTime: number; // In days
}

export interface NewCarType {
  name: string;
  variants: Array<NewCarVariantType>;
}
