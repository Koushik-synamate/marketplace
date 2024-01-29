// pages/success.js
"use client";
import { useUrl } from "nextjs-current-url";
import { useEffect } from "react";
const Success = () => {
  const { search } = useUrl() ?? {};
  console.log(search);
  const codeMatch = search?.match(/code=([^&]*)/);
  const stateMatch = search?.match(/state=([^&]*)/);

  useEffect(() => {
    const fetchData = async () => {
      if (codeMatch && stateMatch) {
        const clientId = "NSxAbB5xHAu49P";
        const clientSecret = "A9mPRtxho2XyvOBy1Yi3jQ9F";
        const authorizationCode = codeMatch[1];

        const tokenRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            redirect_uri:
              "https://inspiring-brigadeiros-5fce73.netlify.app/razorpay/success",
            code: authorizationCode,
            mode: "test",
          }),
        };

        try {
          const tokenResponse = await fetch(
            "https://auth.razorpay.com/token",
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
