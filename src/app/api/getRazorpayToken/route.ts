import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

// interface RequestWithAuthorizationCode extends NextApiRequest {
//   body: {
//     code: string;
//   };
// }
export async function POST(req: NextRequest, res: NextApiResponse) {
  // console.log(req)
  const {code} = await req.json();
  console.log(code);
  if (code) {
    const clientId = "NUSKb4cAK4iP9e";
    const clientSecret = "CpZxiqNI6nclpwkrPWuMnYnN";
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
          "https://inspiring-brigadeiros-5fce73.netlify.app/razorpay/success/",
        code: code,
      }),
    };
    try {
      const tokenResponse = await fetch(
        "https://auth.razorpay.com/token",
        tokenRequestOptions
      );
      console.log("https://auth.razorpay.com/token", tokenRequestOptions);
      const tokenData = await tokenResponse.json();

      // Forward the Razorpay response to the client
      return NextResponse.json(tokenData);
    } catch (error) {
      // console.log("Error fetching Razorpay token:", error?.message);
      return NextResponse.json({ error: "Internal Server Error" });
    }
  } else {
    return NextResponse.json({ error: "NO code found" });
  }
}
