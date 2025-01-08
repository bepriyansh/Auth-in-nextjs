import React from "react";
import { auth } from "@/auth";
import { logout } from "@/actions/auth";
import Image from "next/image";
import LoginGoogle from "./loginGoogle";
import Link from "next/link";

const Logout = async () => {
  const session = await auth();
  if (session?.user) {
    return (
      <div className="flex items-center gap-2 justify-end">
        {session?.user.name}
        {session?.user?.image && (
          <Image
            className="rounded-full"
            width={30}
            height={30}
            alt="User Avatar"
            src={session?.user?.image || ""}
          />
        )}
        <button onClick={logout} className="px-2 py-1 text-sm border rounded-lg">
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-end items-center gap-2">
      <Link href="/login" className="px-2 py-1 text-sm border rounded-lg">Login</Link>
      <LoginGoogle />
    </div>
  );
};
export default Logout;
