import Image from "next/image";
import Form from "./form";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense>
        <Form></Form>
      </Suspense>
    </>
  );
}
