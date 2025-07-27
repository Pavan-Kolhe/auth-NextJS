import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();

// Note: When using the Next.js App Router (inside the app/api/... directory),
//  you must export named functions for each HTTP method like GET, POST, PUT, etc.

// For example, to handle a POST request, use:

// export async function POST(req: Request) {
//   // your logic here
// }
// Do not use export default in these files. That was used in the older Pages Router (pages/api/...)
// and will not work in the App Router.
// If you don’t export a named method, you’ll get a "405 Method Not Allowed" error.

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // our req.body is this type in nextjs
    const { username, email, password } = reqBody;
    console.log(reqBody);

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // salt-> how strong the encryption is (rounds)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
