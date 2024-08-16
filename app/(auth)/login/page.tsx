import Image from "next/image";
import loginImage from "@/assets/login-image.jpg";
import Link from "next/link";
import DarkMode from "@/components/shared/dark-mode";
import LoginForm from "@/components/forms/log-in-form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-muted/50 shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold">Log in to dogbook</h1>
            <p className="text-muted-foreground">
              A place where <span className="italic">dogs</span> and dog owners
              meet
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
          <DarkMode />
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default Login;
