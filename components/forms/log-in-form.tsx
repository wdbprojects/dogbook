"use client";

import { useState, useTransition } from "react";
import { loginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/app/(auth)/login/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (values: LoginValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(values);
      if (error) setError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-foreground/70">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                    autoComplete="off"
                    className="!mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-foreground/70">Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="!mt-8 flex items-center justify-between gap-4">
          <Button
            type="reset"
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => {
              reset();
            }}
          >
            Reset form
          </Button>
          <LoadingButton
            type="submit"
            size="sm"
            className="w-full"
            loading={isPending}
          >
            Log in
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
