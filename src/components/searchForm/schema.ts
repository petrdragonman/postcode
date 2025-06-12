import * as z from "zod";

export const schema = z.object({
  query: z
    .string()
    .min(1, { message: "Please type in suburb or 4 digit code" }),
});
export type SearchFormData = z.infer<typeof schema>;
