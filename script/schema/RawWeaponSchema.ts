import { z } from 'zod';
import { RawWeaponEffectSchema } from './RawWeaponEffectSchema';

export const RawWeaponSchema = z.object({
    id: z.number(), // 15065,
    actionType: z.string().optional(), // "weapon_actionType.2",
    baseRatio: z.number().optional(), // 0.15,
    cooldown: z.number().optional(), // 11000.0,
    cycle: z.number().optional(),
    damage: z.number().optional(),
    description: z.string(), // "weapon_description.15065",
    duration: z.number().optional(), // 8000.0,
    flightTimeAfter: z.number().optional(), // 0.0,
    flightTimeBefore: z.number().optional(), // 0.0,
    hitRate: z.array(z.number().or(z.null())).length(10).or(z.array(z.any()).length(0)),
    icon: z.string(), // "icon_system_type_battle",
    installation: z.number(),
    lockOn: z.number().optional(), // 5000.0,
    name: z.string(), // "weapon_name.15065",
    priority: z.array(z.number().or(z.null())).length(10).or(z.array(z.any()).length(0)),
    rounds: z.number().optional(),
    typename: z.string(), // "weapon_typename.15065",
    effects: z.array(RawWeaponEffectSchema),
});
