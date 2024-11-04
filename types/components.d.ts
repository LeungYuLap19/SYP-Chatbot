// components props interfaces
interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface NavigationTabProps {
  label: string;
  route: string;
  index?: number;
  imgUrl: string;
}

interface CustomButtonProps {
  loading: boolean;
  type: 'submit' | 'button';
  label: string;
  onClick?: () => void;
}