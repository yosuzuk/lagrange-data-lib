import { z } from 'zod';

export const RawWeaponEffectSchema = z.object({
    name: z.string(), // "weapon_effect_desc.7700101"
    description: z.string().optional(), // weapon_effect_desc.1606101
});
