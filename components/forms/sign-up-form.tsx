"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/app/(auth)/signup/actions";
import { PasswordInput } from "../ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";

const SignUpForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (values: SignUpValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
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
                    placeholder="Enter a username"
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-foreground/70">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
                  <PasswordInput placeholder="Enter a password" {...field} />
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
            Sign Up
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
