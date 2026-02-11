"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useAuth";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import { LoginSchemaType, zLogin } from "../utils/zod";
import { useAuth } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Link from "next/link";

const LoginTemplate = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(zLogin) });
  const { mutate: login } = useLogin();
  const setUser = useAuth((state) => state.setUser);
  const onSubmit = (payload: LoginSchemaType) => {
    login(payload, {
      onSuccess: (response) => {
        setUser(response.data);
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
      <div className="flex items-center justify-center py-3">
        <div className="card w-96  shadow-xl  ">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center justify-center mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-base-content/60 mb-6">
              Please login to your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  {...register("emailId")}
                />
                {errors.emailId && (
                  <span className="text-error text-sm mt-1">
                    {errors.emailId.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full mb-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="text-right mb-6">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Don't have an account?
              <Link
                href={routes.signUp}
                className="link link-primary font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTemplate;
