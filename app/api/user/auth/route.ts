import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    // Get the form data
    const body = await request.json();

    // Connect to the database
    await connectDB();

    // Create a new user
    await User.create(body);

    return NextResponse.json({ body });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }

    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
