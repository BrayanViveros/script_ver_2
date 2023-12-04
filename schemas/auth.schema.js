import { z } from "zod";

export const registerSchema = z.object({
  NomCompleto: z.string({
    NomCompleto: "NomCompleto is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
    // Telefono: z
    // .string({
    //   required_error: "Telefono no es correcto",
    // })
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
