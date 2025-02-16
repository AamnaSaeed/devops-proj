// Database
import connectDB from "@/db/connectDB";

// Models
import User from "@/models/User";

// Next Js
import { NextResponse } from "next/server";

// Dependencies
import bcrypt from "bcryptjs";

// Interfaces
interface UserRequest {
  email: string;
  password: string;
}

interface UserResponse {
  name: string;
  email: string;
  phoneNumber: string;
}

interface ErrorResponse {
  message: string;
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export async function POST(request: Request): Promise<NextResponse<{ message: string; user?: UserResponse } | ErrorResponse>> {
  try {
    // Step 1: Get the provided user information
    const { email, password } = (await request.json()) as UserRequest;

    // Step 2: Check if all the required fields are present
    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json({ message: "Please fill in all the required fields." }, { status: 400 });
    }

    // Step 3: Connect to the database
    await connectDB();

    // Step 4: Check if a user with the same email exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist." }, { status: 404 });
    }

    // Step 5: User exists - decrypt & compare their password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // Step 6: Generate a JWT token for the user
    // const token = generateToken({
    //   userId: existingUser._id.toString(),
    //   email: existingUser.email,
    //   name: existingUser.name,
    // });

    // Step 7: Set the token in an HTTP-only cookie
    // setAuthCookie(token);

    // Step 8: Return the existing user (with only necessary fields for security)
    const userResponse: UserResponse = {
      name: existingUser.name,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
    };

    return NextResponse.json({ message: "User logged in successfully", user: userResponse }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in user signup:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "An error occurred while logging in." }, { status: 500 });
  }
}
