"use client";
import { useEffect, useState } from "react";
import { useUrl } from "nextjs-current-url";

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (codeDefined) {
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
          body: JSON.stringify({ ...formData, code }),
        }
      );

      const data = await response.json();
      console.log(data);

      // Additional handling as needed
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
      <button type="submit" disabled={!codeDefined}>
        Submit
      </button>
    </form>
  );
}
