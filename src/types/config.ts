import { configSchema } from '@/config/schema';
import { z } from 'zod';

export type Config = z.infer<typeof configSchema>;

export type ThemeConfig = Config['themes'][string];
