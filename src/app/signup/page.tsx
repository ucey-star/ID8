import React from "react";
import { Mail } from "lucide-react";

function Auth() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
      <div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white p-8 shadow-xl">
        <div className="mb-8 flex justify-center">
          {/* placeholder for icon*/}
          <Mail className="h-12 w-12 text-indigo-600" />
        </div>

        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Enter your email
        </h2>

        <button className="mb-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 transition duration-300 hover:bg-gray-50">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="mr-2 h-5 w-5"
          />
          Continue with Google
        </button>

        <div className="mb-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <button className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#5370F7] to-[#8E54E9] px-4 py-2 font-semibold text-white transition duration-300 hover:bg-gradient-to-r hover:from-[#4d65ce] hover:to-[#874ae8]">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Auth;
