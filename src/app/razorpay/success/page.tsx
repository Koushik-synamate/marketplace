// pages/success.js
import Link from "next/link";

const Success = () => {
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
