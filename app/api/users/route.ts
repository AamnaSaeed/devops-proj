// Database
import connectDB from "@/db/connectDB";

// Models
import User from "@/models/User";

// Next Js
import { NextResponse, NextRequest } from "next/server";

// Types
interface FetchedUsers {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
}

// @desc    Get all users
// @route   GET /api/users
// @access  Private
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Step 1: Get the user email from request headers
    const userEmail = req.headers.get("x-user-email");

    if (!userEmail) {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 401 });
    }

    // Step 2: Get the user
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 401 });
    }

    // Step 3: Check if the user is an admin
    if (user.role !== "admin") {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 401 });
    }

    // Step 4: Connect to the database
    await connectDB();

    // Step 5: Get all the users without the password & timestamps fields
    const users: Array<FetchedUsers> = await User.find().select("-password -createdAt -updatedAt");

    // Step 6: Remove the Admin user
    const filteredUsers: Array<FetchedUsers> = users.filter((user) => user.role !== "admin");

    // Step 7: Remove the role field from the users
    filteredUsers.forEach((user) => delete user.role);

    // Step 8: Return the users
    return NextResponse.json({ users: filteredUsers }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error("An unknown error occurred.");

    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
