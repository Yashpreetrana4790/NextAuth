"use server"
import { RegisterSchema } from "@/shemas";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { GetUserByEmail } from "@/data/user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: " invalid fields"
    }
  }

  const { email, password, name } = validatedFields.data

  const hashPassword = await bcrypt.hash(password, 10)

  const existingUser = await GetUserByEmail(email)

  if (existingUser) {
    return {
      error: "Email already in use"
    }
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashPassword
    }
  })

  if (!user) {
    return {
      error: "Something went wrong"
    }
  }


  return {
    success: "User Created "
  }
}









