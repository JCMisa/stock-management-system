"use server";

import { db } from "@/utils/db";
import { parseStringify } from "../utils";
import { RoleChangeRequest, User } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const askRoleChange = async (
  roleChangeRequestId: string,
  requestOwner: string,
  currentRole: string,
  requestedRole: string,
  reason: string,
  imageProof: string,
  createdAt: string
) => {
  try {
    const data = await db.insert(RoleChangeRequest).values({
      roleChangeRequestId: roleChangeRequestId,
      requestOwner: requestOwner,
      currentRole: currentRole,
      requestedRole: requestedRole,
      reason: reason,
      imageProof: imageProof,
      createdAt: createdAt,
    });

    if (data) {
      // Update the specific user's roleChangeRequest count
      const decrementUserRequestLimit = await db
        .update(User)
        .set({
          roleChangeRequest: sql`${User.roleChangeRequest} - 1`,
        })
        .where(eq(User.email, requestOwner)); // Add where clause to target specific user

      if (decrementUserRequestLimit) {
        revalidatePath("/dashboard");
        return parseStringify({ data: "success" });
      }
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const getAllRequests = async () => {
  try {
    const data = await db.select().from(RoleChangeRequest);

    if (data.length > 0) {
      return parseStringify({ data: data });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

export const getRequestById = async (roleChangeRequestId: string) => {
  try {
    const data = await db
      .select()
      .from(RoleChangeRequest)
      .where(eq(RoleChangeRequest.roleChangeRequestId, roleChangeRequestId));

    if (data?.length > 0) {
      return parseStringify({ data: data[0] });
    }
    return parseStringify({ data: null });
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: unknown) => {
  console.log("Internal error: ", error);
  return parseStringify({ data: null });
};
