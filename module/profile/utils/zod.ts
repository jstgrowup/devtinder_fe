import { zSignUp } from "@/module/auth/utils/zod";
import z from "zod";

export const zEditProfile = zSignUp
  .omit({
    emailId: true,
    password: true,
  })
  .partial();

export type EditProfileSchemaType = z.infer<typeof zEditProfile>;
