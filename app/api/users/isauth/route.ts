// Next Js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Dependencies
import { verify } from "jsonwebtoken";

// Constants
import { COOKIE_NAME } from "@/constants";

export async function GET(): Promise<NextResponse<{ message: string }>> {
  // Step 1: Get the JWT token from the cookie
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  // Step 2: Get the token's value & the JWT secret
  const { value } = token;
  const secret = process.env.JWT_SECRET || ""; // Always check this

  try {
    // Step 3: Verify the JWT token
    verify(value, secret);

    // Step 4: Return the response
    return NextResponse.json({ message: "Authenticated." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }
}
