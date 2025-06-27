import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Input } from '@components/Ui/Input';

interface PasswordInputProps {
  field: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = React.memo(
  ({ field, placeholder, showPassword, onTogglePassword }) => (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...field}
        variant="modal"
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1 text-gray-400 hover:text-gray-600"
        onClick={onTogglePassword}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
