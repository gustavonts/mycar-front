
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { PublicUserSchema } from '../user/schemas';

const CarBaseSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(3, 'Marca deve ter, no mínimo, 3 caracteres')
    .max(30, 'Marca deve ter um máximo de 30 caracteres'),
  model: z
    .string()
    .trim()
    .min(3, 'Modelo deve ter, no mínimo, 3 caracteres')
    .max(30, 'Modelo deve ter um máximo de 30 caracteres'),
  version: z
    .string()
    .trim()
    .min(3, 'Versão deve ter, no mínimo, 3 caracteres')
    .max(30, 'Versão deve ter um máximo de 30 caracteres'),
  year: z
    .string()
    .trim()
    .min(3, 'Ano deve ter, no mínimo, 3 caracteres')
    .max(10, 'Ano deve ter um máximo de 10 caracteres'),
  plate: z
    .string()
    .trim()
    .max(8, 'Placa deve ter um máximo de 8 caracteres')
    .optional()
    .nullable(),
  fuel: z
    .string()
    .trim()
    .min(3, 'Combustivel deve ter, no mínimo, 3 caracteres')
    .max(15, 'Combustivel deve ter um máximo de 15 caracteres'),
  price: z
    .string()
    .trim()
    .min(3, 'Preço deve ter, no mínimo, 3 caracteres')
    .max(10, 'Preço deve ter um máximo de 10 caracteres'),
  mileage: z
    .string()
    .trim()
    .min(3, 'Quilometragem deve ter, no mínimo, 3 caracteres')
    .max(10, 'Quilometragem deve ter um máximo de 10 caracteres'),
  color: z
    .string()
    .trim()
    .min(3, 'Cor deve ter, no mínimo, 3 caracteres')
    .max(20, 'Cor deve ter um máximo de 20 caracteres'),
  description: z.preprocess(
    (val) => (val === undefined || val === null ? '' : String(val)),
    z.string().trim().min(3, 'Descrição é obrigatório').transform(val => sanitizeHtml(val))
  ),
  user: z
    .string()
    .trim()
    .min(2, 'User precisa de um mínimo de 4 caracteres')
    .max(100, 'Nome do user não deve ter mais que 100 caracteres'),
  images: z
  .union([
    z.string().trim().nullable(),
    z.array(z.string().trim()).nullable(),
    z.undefined(),
    z.any() // File
  ])
  .optional()
  .transform(val => {
    if (!val || val === undefined) return [];
    if (val instanceof File) {
      if (val.size === 0 || val.name === "undefined") return [];
      return [val];
    }
    if (typeof val === "string") return val ? [val] : [];
    if (Array.isArray(val)) return val;
    return [];
  }),
  active: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

export const CreateCarForApiSchema = CarBaseSchema.omit({
  user: true,
  active: true
}).extend({})

export const UpdateCarForApiSchema = CarBaseSchema.omit({
  user: true,
}).extend({})

export const PublicCarForApiSchema = CarBaseSchema.extend({
    id: z.string().default(''),
    brand: z.string().default(''),
    model: z.string().default(''),
    version: z.string().default(''),
    year: z.preprocess(val => val?.toString(), z.string().default('')),
    plate: z.string().default(''),
    fuel: z.string().default(''),
    price: z.preprocess(val => val?.toString(), z.string().default('')), 
    mileage: z.preprocess(val => val?.toString(), z.string().default('')),
    color: z.string().default(''),
    description: z.string().default(''),
    images: z.array(z.string()).default([]),
    user: PublicUserSchema.optional().default({
      id: '',
      email: '',
      name: ''

    }),
    createdAt: z.string().default(''),
})

export type CreateCarForApiDto = z.infer<typeof CreateCarForApiSchema>
export type UpdateCarForApiDto = z.infer<typeof UpdateCarForApiSchema>
export type PublicCarForApiDto = z.infer<typeof PublicCarForApiSchema>



