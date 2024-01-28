// pages/index.js
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUrl } from "nextjs-current-url";
import { Toast } from "primereact/toast";
import { randomBytes } from "crypto";
import cryptoRandomString from "crypto-random-string";
const Home = () => {
  const toast = useRef<Toast>(null);
  const { search } = useUrl() ?? {};
  const initialCode = search?.replace("?code=", "");
  const [code, setCode] = useState(initialCode);
  const [codeDefined, setCodeDefined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
<<<<<<< HEAD
  const state = cryptoRandomString({ length: 17 });
=======
  const state = generateRandomString(17);
  console.log(state+"dsfds");
>>>>>>> ee3f6721cd31b43c5add691176667fe1b59b1c92
  useEffect(() => {
    console.log(initialCode?.length);
    if (
      initialCode !== undefined &&
      initialCode !== null &&
      initialCode.length > 0
    ) {
      setCode(initialCode);
      setCodeDefined(true);
    }
  }, [initialCode]);
  useEffect(() => {
    if (codeDefined) {
      console.log("sdfsfd");
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
<<<<<<< HEAD
          body: JSON.stringify({ code, ...tokenData, state }),
=======
          body: JSON.stringify({ code, ...tokenData , state}),
>>>>>>> ee3f6721cd31b43c5add691176667fe1b59b1c92
        }
      );

      const data = await response.json();
      console.log(data);
      if (data) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          life: 3000,
        });
        router.push(
          `https://auth.razorpay.com/authorize?response_type=code&client_id=NSxAbZB40wuIsx&redirect_uri=https://inspiring-brigadeiros-5fce73.netlify.app/razorpay/success/&scope=read_only&state=${state}`
        );
      }
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid Authorization Code",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
        <p className="text-lg mb-6">Connect with Razorpay to make a payment.</p>
        <button
          onClick={onClick}
          disabled={buttonDisabled}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {buttonDisabled ? "Connecting..." : "Connect with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default Home;
