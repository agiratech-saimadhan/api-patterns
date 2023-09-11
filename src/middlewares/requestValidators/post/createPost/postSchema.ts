import { z } from "zod";

const postValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUri: z.string().min(1, "Image URI is required"),
  tags: z.array(z.string()).optional(),
});

export default postValidationSchema;
