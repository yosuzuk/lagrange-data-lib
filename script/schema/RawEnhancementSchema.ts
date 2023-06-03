import { z } from 'zod';
import { RawEnhancementEffectSchema } from './RawEnhancementEffectSchema';

export const RawEnhancementSchema = z.object({
    description: z.string(), // "enhancement_description.10101",
    detail: z.string(), // "enhancement_detail.10101",
    flagShip: z.boolean(),
    icon: z.string(), // "icon_system_intensify_101.png",
    name: z.string(), // "enhancement_name.10101",
    techs: z.array(z.number()),
    targetShip: z.enum([
        'UNKNOWN',
        'UNKNOWN2',
        'UNKOWN',
        'UNKOWN2',
        'SHIP_SELF',
        'SHIP_AIRCRAFT',
        'SHIP_SYS_AIRCRAFT',
        'SHIP_ROW1',
        'SHIP_ROW2',
        'TEAM_SHIP',
        'TEAM_AIRCRAFT',
        'TARGET_SHIP_ENDURANCE',
        'TARGET_SHIP_REMOTE',
        'TARGET_UNK_1',
        'TARGET_UNK_2',
        'TARGET_UNK_3',
        'TARGET_UNK_4',
        'TARGET_UNK_5',
        'TARGET_UNK_6',
        'TARGET_UNK_7',
        'TARGET_UNK_8',
    ]),
    targetSystem: z.enum([
        'SELF',
        'MAIN',
        'TARGET_SYSTEM_NOT_MAIN',
        'ALL',
    ]),
    triggerModule: z.string().optional(), // 'WEAPON', 'ARMOR', etc.
    trigWeaponType: z.string().optional(), // "ARTILLERY",
    weapon: z.number().optional(), // weapon id
    effects: z.array(RawEnhancementEffectSchema),
});
