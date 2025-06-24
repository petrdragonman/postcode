import * as z from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z
    .string()
    .min(4, { message: "Required with min of 4 characters." }),
});

export type LoginFormData = z.infer<typeof schema>;
