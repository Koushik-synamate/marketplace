"use client";
import { useEffect, useState } from "react";
import { useUrl } from "nextjs-current-url";

// const CopyButton = ({}) => {
//   return (
//     <button
//       onClick={handleCopyClick}
//       style={{
//         marginLeft: "10px", // Add any desired styling
//         cursor: "pointer",
//         border: "none",
//         background: "none",
//       }}
//     >
//       <i className="fas fa-copy"></i>
//     </button>
//   );
// };

export default function Form() {
  const { search } = useUrl() ?? {};
  const initialCode = search?.replace("?code=", "");
  const [code, setCode] = useState(initialCode);
  const [formData, setFormData] = useState({});
  const [codeDefined, setCodeDefined] = useState(false);

  useEffect(() => {
    if (initialCode !== undefined && initialCode !== null) {
      setCode(initialCode);
      setCodeDefined(true);
    }
  }, [initialCode]);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      "https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/Razorpay_test"
    );
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
    } else {
      console.log("Code is not defined, waiting...");
    }
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="p-8 justify-center items-center h-screen flex ">
      <form
        className=" inline-grid justify-center items-center max-w-sm mx-auto fixed"
        onSubmit={handleSubmit}
      >
        <p className="block text-center text-lg font-extrabold text-gray-900 dark:text-white mb-10">
          Razorpay Integration
        </p>
        <div className="mb-5">
          <label
            htmlFor="merchant_id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Merchant ID:
          </label>
          <input
            type="text"
            id="merchant_id"
            name="merchant_id"
            onChange={handleChange}
            placeholder="Enter your merchant ID"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="text-justify block my-2">
            Kindly configure your Razorpay account with the following webhook
            URL:
          </label>
          <p className="block my-2">
            https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/Razorpay_test
          </p>
        </div>
        <button
          onClick={handleCopyClick}
          style={{
            cursor: "pointer",
          }}
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
        >
          Copy to ClipBoard
        </button>
        <br />
        <button
          type="submit"
          disabled={!codeDefined}
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
