import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // our req.body is this type in nextjs
    const { token, newPassword } = reqBody;
    console.log(token);
    // check if user already exists
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Token to find user" },
        { status: 400 }
      );
    }

    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.password = hashedpassword;

    await user.save();
    return NextResponse.json({
      message: "Email verified successfully and password updated",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
