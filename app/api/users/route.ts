// Database
import connectDB from "@/db/connectDB";

// Models
import User from "@/models/User";

// Next Js
import { NextResponse } from "next/server";

// @desc    Get all users
// @route   GET /api/users/auth
// @access  Private
export async function GET() {
  try {
    // ENSURE THAT ONLY THE ADMIN CAN ACCESS THIS ROUTE

    // Step 1: Connect to the database
    await connectDB();

    // Step 2: Get all the users
    const users = await User.find();

    // Step 3: Return the users
    return NextResponse.json({ users });
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error("An unknown error occurred.");

    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
