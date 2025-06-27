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
import type { RegisterDto } from '@api-types/auth';
import { PasswordInput } from '../Inputs';

interface RegisterFormProps {
  form: UseFormReturn<RegisterDto>;
  onSubmit: (data: RegisterDto) => void;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = React.memo(
  ({
    form,
    onSubmit,
    isLoading,
    showPassword,
    showConfirmPassword,
    onTogglePassword,
    onToggleConfirmPassword,
  }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField<RegisterDto, 'username'>
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Choose a username"
                  {...field}
                  variant="modal"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<RegisterDto, 'email'>
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  variant="modal"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField<RegisterDto, 'firstName'>
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="modal">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} variant="modal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField<RegisterDto, 'lastName'>
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel variant="modal">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} variant="modal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField<RegisterDto, 'password'>
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  placeholder="Create a password"
                  showPassword={showPassword}
                  onTogglePassword={onTogglePassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<RegisterDto, 'confirmPassword'>
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="modal">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  placeholder="Confirm your password"
                  showPassword={showConfirmPassword}
                  onTogglePassword={onToggleConfirmPassword}
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
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </Form>
  )
);

RegisterForm.displayName = 'RegisterForm';

export { RegisterForm };
