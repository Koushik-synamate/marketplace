// pages/api/getRazorpayToken.js
import fetch from "node-fetch";

export default async function handler(
  req: { method: string; body: { authorizationCode: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      end: { (): any; new (): any };
      json: { (arg0: { error: string }): void; new (): any };
    };
    json: (arg0: unknown) => void;
  }
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { authorizationCode } = req.body;
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
    res.json(tokenData);
  } catch (error) {
    // console.error('Error fetching Razorpay token:', error?.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
