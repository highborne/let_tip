import * as z from 'zod'

export const billFormSchema = z.object({
  billValue: z
    .number({
      message: 'O valor deve ser um número.',
    })
    .min(0.01, 'O valor mínimo é 0.01.'),
})

export type BillFormSchemaType = z.infer<typeof billFormSchema>
