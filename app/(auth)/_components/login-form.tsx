"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner"
import Cookies from "js-cookie";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuLoader } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { FormError } from "./form-message-error";
import { FormSuccess } from "./form-message-success";
import { CardWrapper } from "./card-wrapper";

import { URI_REGISTER } from "@/config/route.config";


type Props = {};

export const LoginForm = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransition(async () => {
      setErrorMessage("");
      setSuccessMessage("");
      // or you can use api route
      axios.post('/api/auth/login', values).then((response) => {

        // Stocker dans les cookies
        Cookies.set('access_token', response.data.accessToken, {
          expires: 2 / 24,
          sameSite: 'lax',
        });
        Cookies.set('refresh_token', response.data.refreshToken, {
          expires: 1,
          sameSite: 'lax'
        });

        // Récupérer l'URL de redirection depuis les query params
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect');

       // Rediriger vers l'URL demandée ou vers le dashboard par défaut
       const targetUrl = redirectUrl || '/dashboard';
        console.log("login form",targetUrl)
        setSuccessMessage("Login Successfully!");
        toast.success("Login Successfully!");
        router.replace(targetUrl)
        window.location.reload();

      }).catch((error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        setErrorMessage(message)
        toast.error(message);

      });
    });
  };

  return (
    <CardWrapper
      headerLabel=""
      backButtonLabel="Don't have an account ?"
      backButtonHref={URI_REGISTER}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="herve.ngando@eneo.cm"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="*********"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <LuLoader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};



