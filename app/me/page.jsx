import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";
import { cookies } from "next/headers";

const getAddresses = async () => {
  const nextCookies = cookies();

  // Handle both dev + prod cookie names
  const nextAuthSessionToken =
    nextCookies.get("next-auth.session-token") ||
    nextCookies.get("__Secure-next-auth.session-token");

  if (!nextAuthSessionToken) {
    console.log("⚠️ No session cookie found");
    return []; // or throw new Error("Not authenticated")
  }

  console.log("nextAuthSessionToken", nextAuthSessionToken);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken.value}`,
    },
    withCredentials: true,
  });

  return data?.addresses || [];
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return (
    <div>
      <Profile addresses={addresses} />
    </div>
  );
};

export default ProfilePage;
