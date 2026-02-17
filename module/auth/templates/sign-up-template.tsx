"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/useAuth";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import { SignupSchemaType, zSignUp } from "../utils/zod";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Link from "next/link";
import { AuthWrapper } from "../components/auth-wrapper";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const SignUpTemplate = () => {
  const router = useRouter();
  const form = useForm<SignupSchemaType>({ resolver: zodResolver(zSignUp) });
  const { mutate: signup, isPending } = useSignup();
  const onSubmit = (payload: SignupSchemaType) => {
    signup(payload, {
      onSuccess: (response) => {
        openSuccessToast({ message: response.message });
        router.push(routes.feed);
      },
      onError: (error) => {
        openErrorToast({ error });
      },
    });
  };
  return (
    <>
      {" "}
      <div className="flex min-h-screen items-center justify-center px-4">
        <AuthWrapper title="Welcome," description="Please Signup">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoFocus
                        {...field}
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
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end text-sm">
                <Link
                  href="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href={routes.signUp}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </AuthWrapper>
      </div>
    </>
  );
};

export default SignUpTemplate;
