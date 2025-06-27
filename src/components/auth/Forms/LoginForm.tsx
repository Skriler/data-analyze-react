import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@components/Ui/Button';
import { Input } from '@components/Ui/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import type { LoginDto } from '@api-types/auth';
import { PasswordInput } from '../Inputs';

interface LoginFormProps {
  form: UseFormReturn<LoginDto>;
  onSubmit: (data: LoginDto) => void;
  isLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({ form, onSubmit, isLoading, showPassword, onTogglePassword }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField<LoginDto, 'username'>
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  variant="modal"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<LoginDto, 'password'>
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  onTogglePassword={onTogglePassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="blue"
          size="tall"
          className="w-full rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  )
);

LoginForm.displayName = 'LoginForm';

export { LoginForm };
