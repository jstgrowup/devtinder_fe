import z from "zod";

export const zEditProfile = z
  .object({
    firstName: z
      .string({ error: "First name is required" })
      .min(4, "First name must be at least 4 characters")
      .max(40, "First name cannot exceed 40 characters")
      .trim(),
    lastName: z.string().max(40).trim().optional(),
    age: z.number().min(1, "Please enter the age"),
    gender: z.enum(["male", "female", "others"]),
    about: z.string().optional(),
    skills: z
      .array(z.string())
      .max(10, { message: "You can have a maximum of 10 skills" }),
    photoUrl: z.string(),
  })
  .partial();

export type EditProfileSchemaType = z.infer<typeof zEditProfile>;
