import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function (request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error) {
    throw error;
  }
}
