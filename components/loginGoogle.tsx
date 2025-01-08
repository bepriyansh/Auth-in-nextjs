"use client";

import { login } from "@/actions/auth";
import React from "react";

const LoginGoogle = () => {
  return (
    <button
      className="px-2 py-1 text-sm border rounded-lg"
      onClick={() => login("google")}
    >
      Continue with Google
    </button>
  );
};

export default LoginGoogle;
