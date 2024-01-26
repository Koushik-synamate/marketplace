// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUrl } from "nextjs-current-url";
const Home = () => {
  const { search } = useUrl() ?? {};
  const initialCode = search?.replace("?code=", "");
  const [code, setCode] = useState(initialCode);
  const [formData, setFormData] = useState({});
  const [codeDefined, setCodeDefined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    if (initialCode !== undefined && initialCode !== null) {
      setCode(initialCode);
      setCodeDefined(true);
    }
  }, [initialCode]);
  useEffect(() => {
    if (codeDefined) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [codeDefined]);
  const router = useRouter();
  const onClick = async () => {
    if (codeDefined) {
      const tokenResponse = await fetch(
        "https://services.leadconnectorhq.com/oauth/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: "65ae52ca338c5626eecfb6ef-lrpx71wo",
            client_secret: "e25a6f29-86ab-4cda-a60d-02464adaa3a0",
            grant_type: "authorization_code",
            ...(code && { code }),
          }),
        }
      );
      const tokenData = await tokenResponse.json();
      console.log("Token Response:", tokenData);
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/User_Data",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, code, ...tokenData }),
        }
      );

      const data = await response.json();
      console.log(data);
      router.push(
        "https://auth.razorpay.com/authorize?response_type=code&client_id=NSxAbZB40wuIsx&redirect_uri=https://inspiring-brigadeiros-5fce73.netlify.app/razorpay/success/&scope=read_only&state=current_state"
      );
    } else {
      console.log("Code is not defined, waiting...");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
        <p className="text-lg mb-6">Connect with Razorpay to make a payment.</p>
        <button
          onClick={onClick}
          disabled={loading || buttonDisabled}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Connecting..." : "Connect with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default Home;
