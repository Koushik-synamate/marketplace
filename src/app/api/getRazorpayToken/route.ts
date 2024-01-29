import { NextResponse } from "next/server";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export async function POST(
  res: NextApiResponse,
  req: { method: string; body: { authorizationCode: string } }
) {
  const authorizationCode = req.body;
  const clientId = "NSxAbB5xHAu49P";
  const clientSecret = "A9mPRtxho2XyvOBy1Yi3jQ9F";
  const tokenRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    const tokenData = await tokenResponse.json();

    // Forward the Razorpay response to the client
    return NextResponse.json(tokenData);
  } catch (error) {
    // console.error('Error fetching Razorpay token:', error?.message);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
// import { NextApiResponse } from "next";
// import axios from "axios";
// import type { NextApiRequest } from "next";

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { authorizationCode } = req.body;
//   const clientId = "NSxAbB5xHAu49P";
//   const clientSecret = "A9mPRtxho2XyvOBy1Yi3jQ9F";

//   const tokenRequestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       client_id: clientId,
//       client_secret: clientSecret,
//       grant_type: "authorization_code",
//       redirect_uri:
//         "https://inspiring-brigadeiros-5fce73.netlify.app/razorpay/success",
//       code: authorizationCode,
//       mode: "test",
//     }),
//   };

//   try {
//     const tokenResponse = await fetch(
//       "https://auth.razorpay.com/token",
//       tokenRequestOptions
//     );

//     if (!tokenResponse.ok) {
//       throw new Error("Razorpay token request failed");
//     }

//     const tokenData = await tokenResponse.json();

//     // Send the response using Next.js API response object
//     res.status(200).json(tokenData);
//   } catch (error: any) {
//     console.error("Error fetching Razorpay token:", error?.message);

//     // Send an error response using Next.js API response object
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
