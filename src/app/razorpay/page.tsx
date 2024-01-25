// pages/index.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  const onClick = () => {
    router.push(
      "https://auth.razorpay.com/authorize?response_type=code&client_id=NSxAbZB40wuIsx&redirect_uri=https://inspiring-brigadeiros-5fce73.netlify.app/success/&scope=read_only&state=current_state"
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
        <p className="text-lg mb-6">Connect with Razorpay to make a payment.</p>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Home;
