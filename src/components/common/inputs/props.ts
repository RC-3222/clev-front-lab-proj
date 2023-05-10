import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export type CustomInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder?: string;
  error?: string | boolean;
  clearActionErrors?: () => void;
  required?: boolean;
  hint?: string;
  validate?: any;
  defaultValue?: string;
  notAuthFilled?: boolean;
  isDisabled?: boolean;
  dataTestId?: string;
  customHint?: ReactNode;
}
