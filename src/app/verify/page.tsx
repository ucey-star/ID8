"use client";

import React, { useState } from "react";
import InputField from "../_components/InputField";
import GradientButton from "../_components/GradientButton";
import Link from "next/link";

function Verify() {
    const [code, setCode] = useState("");

    const handleVerification = () => {
        // Add functionality for verifying the code
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
            <div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-20 py-12 shadow-xl">
                <div className="mb-8 flex justify-center">
                    <img src="/ID8_logo.svg" alt="ID8 Logo" className="h-15 w-15" />
                </div>
                
                <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
                    We have sent you a verification code!
                </h2>

                <InputField
                    id="verification-code"
                    label="Verification Code"
                    placeholder="Enter your code"
                    value={code}
                    handleChange={(e) => setCode(e.target.value)}
                />

                <GradientButton content="Verify" onClick={handleVerification} />

                <div className="flex justify-center mt-4">
                    <Link href="/signup" className="font-semibold text-[#5370F7] underline">
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Verify;