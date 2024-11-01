"use server"
import { RegisterSchema } from "@/shemas";
import { z } from "zod";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: " invalid fields"
    }
  }




  return {
    success: "Confirmation email sent"
  }
}
