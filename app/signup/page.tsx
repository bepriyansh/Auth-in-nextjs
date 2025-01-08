import SignUpForm from "@/components/signupForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="max-w-[350px] border rounded-lg p-8 flex flex-col gap-4">
        <SignUpForm />
        <p>
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
