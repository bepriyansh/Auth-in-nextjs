import React from "react";
import Logout from "./logout";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full border-b shadow px-12 py-2 flex justify-end items-center gap-10 bg-slate-700/50">
      <Link href="/">Home</Link>
      <Link href="/protected">Protected Route</Link>
      <Logout />
    </div>
  );
};

export default Header;
