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
  role: string,
  createdAt: string
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
        createdAt: createdAt,
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

export const updateUserAvatar = async (userId: string, downloadUrl: string) => {
  try {
    const existingUser = await getUserById(userId);
    if (existingUser?.data !== null) {
      const data = await db.update(User).set({
        imageUrl: downloadUrl,
      });

      if (data) {
        return parseStringify({ data: data });
      }
      return parseStringify({ data: null });
    }
  } catch (error) {
    console.log(
      "Internal error occured while updating the user profile: ",
      error
    );
    return parseStringify({ data: null });
  }
};

export const updateUserInfo = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  form: {
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: string;
    age: string;
    contact: string;
    address: string;
    bio: string;
    gender: string;
    role: string;
  }
) => {
  try {
    const {
      firstname,
      lastname,
      email,
      dateOfBirth,
      age,
      contact,
      address,
      bio,
      gender,
      role,
    } = form;

    const result = await db.update(User).set({
      firstname: firstname,
      lastname: lastname,
      email: email,
      dateOfBirth: dateOfBirth,
      age: Number(age),
      contact: contact,
      address: address,
      bio: bio,
      gender: gender,
      role: role,
    });

    if (result) {
      return parseStringify({ data: result });
    }
    return parseStringify({ data: null });
  } catch (error) {
    console.log("Internal error occured while updating the user info: ", error);
    return parseStringify({ data: null });
  }
};
