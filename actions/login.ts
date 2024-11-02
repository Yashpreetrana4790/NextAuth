"use server"
import { GetUserByEmail } from "@/data/user";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth";
import { LoginSchema } from "@/shemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_PATH } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;
  const user = await GetUserByEmail(email);
  if (!user || !user.password) {
    return {
      error: "Email not found",
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      error: "Invalid password",
    };
  }

  try {

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_PATH,
    });
    return {
      success: "Logged in",
    };
  }
  catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "invalid credentials"
          }
        default: return { error: " Something went wrong" }
      }
    throw error
  }
};



