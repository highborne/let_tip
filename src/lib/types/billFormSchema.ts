import * as z from 'zod';

export const billFormSchema = z.object({
  billValue: z.number({
    message: "O valor deve ser um número.",
  }).min(1, "O valor mínimo é 1."),
})

export type BillFormSchemaType = z.infer<typeof billFormSchema>;