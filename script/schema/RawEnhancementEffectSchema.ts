import { z } from 'zod';

export const RawEnhancementEffectSchema = z.object({
    type: z.string().optional(), // "enhancement_effect.12012",
    action: z.enum([
        'RATIO_ADD',
        'RATIO_DEL',
        'NUM_ADD',
        'TARGET_SHIP',
        'TARGET_WEAPON',
        'CHANCE',
        'BASE_NUM_ADD',
    ]).optional(),
    value: z.number().optional(),
    action2: z.string().optional(),
    value2: z.number().optional(),
});
