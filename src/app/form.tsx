"use client";
import { useState } from "react";
// import { useRouter } from "next/router";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
export default function Form() {
  //   const router = useRouter();
  const [formData, setFormData] = useState({});
  const params = useParams();
  //   console.log(router);

  const code = params.code;
  // const router = useRouter();
  //   const { code } = useRouter();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/User_Data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    console.log(data);

    console.log(formData);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      code: code,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="location_id">Location_id:</label>
      <input
        type="text"
        id="location_id"
        name="location_id"
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="merchant_id">merchant_id:</label>
      <input
        type="text"
        id="merchant_id"
        name="merchant_id"
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
