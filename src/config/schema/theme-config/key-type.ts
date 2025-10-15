import { z } from 'zod';

export const keyType = z.union([z.string(), z.number()]);
