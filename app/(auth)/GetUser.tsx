"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

export const getUser = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const user = await currentUser();
    return user;
  } catch (error) {
    console.error("Error fetching user: ", error);
    return null;
  }
};
