// components props interfaces
interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface NavigationTab {
  label: string;
  route: string;
  index?: number;
}