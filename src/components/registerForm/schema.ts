import * as z from "zod";

export const schema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required." }),
  lastName: z.string().min(1, { message: "Lastname is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  password: z
    .string()
    .min(4, { message: "Required with min of 4 characters." }),
  email: z.string().min(1, { message: "Email is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export type RegisterFormData = z.infer<typeof schema>;
