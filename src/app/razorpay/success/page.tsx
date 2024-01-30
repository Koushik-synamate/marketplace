// pages/success.js
"use client";
import { useUrl } from "nextjs-current-url";
import { useEffect } from "react";
const Success = () => {
  const { search } = useUrl() ?? {};
  const codeMatch = search?.match(/code=([^&]*)/);
  const stateMatch = search?.match(/state=([^&]*)/);

  useEffect(() => {
    const fetchData = async () => {
      if (codeMatch && stateMatch) {
        const authorizationCode = codeMatch[1];
        console.log(authorizationCode);
        const tokenRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            code: authorizationCode,
          }),
        };
        console.log(tokenRequestOptions);

        try {
          const tokenResponse = await fetch(
            "/api/getRazorpayToken",
            tokenRequestOptions
          );

          if (!tokenResponse.ok) {
            throw new Error(`HTTP error! Status: ${tokenResponse.status}`);
          }

          const tokenData = await tokenResponse.json();
          console.log("Token Response:", tokenData);

          const userRazorpayRequestOptions = {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...tokenData,
            }),
          };
          console.log(...tokenData);
          console.log(userRazorpayRequestOptions);

          const userRazorpayResponse = await fetch(
            "https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/User_Razorpay",
            userRazorpayRequestOptions
          );

          if (!userRazorpayResponse.ok) {
            throw new Error(
              `HTTP error! Status: ${userRazorpayResponse.status}`
            );
          }

          const userData = await userRazorpayResponse.json();
          console.log("User Razorpay Response:", userData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [codeMatch, stateMatch]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Successfully Authorized</h1>
        <p className="text-lg mb-6">
          You are successfully authorized with Razorpay.
        </p>
      </div>
    </div>
  );
};

export default Success;
