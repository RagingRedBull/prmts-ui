import {z} from "zod";

export const Compartment = z.object({
    id: z.string(),
    floorId: z.string(),
    konvaSpec: z.object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number()
    }),
    detectorUnits: z.set(z.string())
});

export const SensorLog = z.object({
    type: z.string(),
    value: z.number()
})

export type Compartment = z.infer<typeof Compartment>;
export type SensorLog = z.infer<typeof SensorLog>;