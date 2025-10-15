import { z } from 'zod';
import { keyType } from '../key-type';

export const baseColorTokens = z
  .record(
    keyType.describe('Color name'),
    z.union([
      z.string().describe('Color value'),
      z.record(
        keyType.describe('Color variant'),
        z.string().describe('Color value'),
      ),
    ]),
  )
  .describe('Color record. Name to value');
