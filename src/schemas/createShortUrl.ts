import { object, string } from "yup";

export default object({
  body: object({
    preferredAlias: string()
    .min(2, "Your preferred Alias must be at least 2 characters")
    .max(32, "Your preferred Alias must be at most 32 characters"),
    destination: string()
      .url("Must be a valid URL")
      .required("A long URL is required"),
  }),
});
