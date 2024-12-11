"use server";

import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { parseStringify } from "../utils";

export const getUserById = async (userId: string) => {
  try {
    const data = await db.select().from(User).where(eq(User.userId, userId));

    if (data.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
  } catch (error) {
    console.log("Internal error occured while fetching user by id: ", error);
    return parseStringify({ data: null });
  }
};

export const getUserByEmail = async (userEmail: string) => {
  try {
    const data = await db.select().from(User).where(eq(User.email, userEmail));

    if (data.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
  } catch (error) {
    console.log("Internal error occured while fetching user by email: ", error);
    return parseStringify({ data: null });
  }
};

export const createUser = async (
  userId: string,
  email: string,
  firstname: string,
  lastname: string,
  imageUrl: string,
  role: string
) => {
  try {
    const existingUser = await getUserById(userId);
    if (existingUser?.data === null) {
      // proceed on adding the user
      const data = await db.insert(User).values({
        userId: userId,
        email: email,
        firstname: firstname,
        lastname: lastname,
        imageUrl: imageUrl,
        role: role,
      });

      // if successful creation
      if (data) {
        return parseStringify({ data: data });
      }
      // if creation failed
      return parseStringify({ data: null });
    }
    // if user already exists
    return parseStringify({ data: null });
  } catch (error) {
    console.log("Internal error occured while creating the use: ", error);
    return parseStringify({ data: null });
  }
};
