import { z } from 'zod';

export type ForgotPasswordDto = z.output<typeof ForgotPassword>;
export const ForgotPassword = z.object({
  credential: z.string().trim().email(),
  register: z.boolean()
});

export type ResetPasswordDto = z.output<typeof ResetPassword>;
export const ResetPassword = z.object({
  credential: z.string().trim().email(),
  password: z.string().trim().min(8),
  confirmPassword: z.string().trim(),
  initials: z.string()
})
.refine(
  (body) => {
    return (body.password === body.confirmPassword);
  },
  {
    message: 'Senhas informadas estão diferentes.',
  },
);
