import { z } from 'zod';
import { RawWeaponSchema } from './RawWeaponSchema';
import { RawEnhancementSchema } from './RawEnhancementSchema';

export const RawSystemSchema = z.object({
    id: z.number(), // 7050101,
    enhancementsLimit: z.number(),
    hp: z.number(),
    main: z.boolean(),
    name: z.string(), // "system_name.7050101",
    optional: z.boolean(),
    option: z.string(), // "M1",
    weapons: z.array(RawWeaponSchema),
    enhancements: z.array(RawEnhancementSchema),
});
