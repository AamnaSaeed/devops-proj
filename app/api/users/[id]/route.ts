// Database
import connectDB from "@/db/connectDB";

// Models
import User from "@/models/User";

// Next Js
import { NextResponse } from "next/server";

// @desc    Get all users
// @route   GET /api/users
// @access  Private
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    // Step 1: Get the user email from request headers
    const userEmail = req.headers.get("x-user-email");

    if (!userEmail) {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 401 });
    }

    // Step 2: Get the user making the request
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: "User not found or unauthorized." }, { status: 401 });
    }

    // Step 3: Connect to the database
    await connectDB();

    // Step 4: Get the user to be deleted
    const userId = params.id;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Step 5: Check if the user is authorized to perform this action
    if (userToDelete.email !== userEmail && user.role !== "admin") {
      return NextResponse.json({ message: "Not authorized." }, { status: 401 });
    }

    // Step 6: Delete the user
    await User.findByIdAndDelete(userId);

    // Step 7: Return an appropriate response
    return NextResponse.json({ message: "User deleted.", user: userToDelete }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    else console.error("An unknown error occurred.");

    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
