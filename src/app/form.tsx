"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    console.log(formData);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        required
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
