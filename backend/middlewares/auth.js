import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return next(new ErrorHandler("Login first to access this route", 401));
    }

    req.user = session.user;
    next();
  } catch (err) {
    return next(new ErrorHandler("Authentication failed", 500));
  }
};

export { isAuthenticatedUser };
