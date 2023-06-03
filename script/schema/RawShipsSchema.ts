import z from 'zod';
import { RawShipSchema } from './RawShipSchema';

export const RawJsonSchema = z.array(RawShipSchema);
