import z from 'zod';
import { RawJsonSchema } from '../schema/RawShipsSchema';
import { RawShipSchema } from '../schema/RawShipSchema';
import { RawSystemSchema } from '../schema/RawSystemSchema';
import { RawWeaponSchema } from '../schema/RawWeaponSchema';
import { RawWeaponEffectSchema } from '../schema/RawWeaponEffectSchema';
import { RawEnhancementSchema } from '../schema/RawEnhancementSchema';
import { RawEnhancementEffectSchema } from '../schema/RawEnhancementEffectSchema';

export type RawShips = z.infer<typeof RawJsonSchema>;
export type RawShip = z.infer<typeof RawShipSchema>;
export type RawSystem = z.infer<typeof RawSystemSchema>;
export type RawWeapon = z.infer<typeof RawWeaponSchema>;
export type RawWeaponEffect = z.infer<typeof RawWeaponEffectSchema>;
export type RawEnhancement = z.infer<typeof RawEnhancementSchema>;
export type RawEnhancementEffect = z.infer<typeof RawEnhancementEffectSchema>;
