import { NextResponse } from "next/server";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
interface RequestWithAuthorizationCode extends NextApiRequest {
  body: {
    authorizationCode: string;
  };
}
export async function POST(req: RequestWithAuthorizationCode) {
  const authorizationCode = req.body;
  const clientId = "NUQBXN2MccPRWf";
  const clientSecret = "mq64JWzv89WmQkbECREvEnh4";
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
      code: authorizationCode,
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
