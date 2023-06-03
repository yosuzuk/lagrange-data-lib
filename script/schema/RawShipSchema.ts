import z from 'zod';
import { RawSystemSchema } from './RawSystemSchema';

export const RawShipSchema = z.object({
    id: z.number(), // 70501
    aircraftGroupNum: z.number(),
    capacity: z.number(),
    commandPoint: z.number(),
    company: z.string(), // "company.2",
    crystal: z.number(),
    description: z.string(), // "ship_desc.70501",
    deuterium: z.number(),
    history: z.string(), // "ship_history.705",
    hp: z.number(),
    image: z.string(), // "b_support_h_001_1.png",
    maxShip: z.number(),
    metal: z.number(),
    moribound: z.number(), // 0.4,
    name: z.string(), // "ship_name.70501",
    proverbe: z.string(), // "ship_proverbe.705",
    rating: z.array(z.enum(['', 'S', 'A', 'B', 'C'])).length(6).or(z.array(z.any()).length(0)),
    row: z.string(), // "row.1",
    shipTypeName: z.string(), // "ship_type.7",
    shortName: z.string(), // "ship_shortName.70501",
    size: z.number(),
    speed: z.number(),
    systems: z.array(RawSystemSchema),
    timeCost: z.number(),
    typeName: z.string(), // "ship_typeName.70501",
    variante: z.string(), // "A"
});
