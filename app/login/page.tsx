import LoginForm from "@/components/loginForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="max-w-[350px] border rounded-lg p-8 flex flex-col gap-4">
        <LoginForm />
        <p>
          Don't have an account ?{" "}
          <Link href="/signup" className="text-blue-500">
            Create
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
