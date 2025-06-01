export type Role = 'admin' | 'user';

export type User = {
  id: number;
  username: string;
  role: Role;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  username?: string;
  created_at: string;
}

export interface ItemFormProps {
  onSubmit: () => void;
  currentItem: Item | null;
  onCancel: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (userId: number) => void;
  logout: () => void;
  isAdmin: boolean;
} 