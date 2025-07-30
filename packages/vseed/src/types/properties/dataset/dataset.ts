import z from "zod";

/**
 * example dataset link:
 * [
 *    { date: '2019', 20001:'type', profit:10, sales: null, },
 *    { date: '2020', 20001:'type', profit:30, sales: -1.1, },
 *    { date: '2021', 20001:'type', profit:30, sales: 1, },
 *    { date: '2023', 20001:'type', profit:40, sales: undefined, },
 *    { date: '2022', 20001:'type', profit:50, sales: 100, },
 * ]
 */
export const zDataset = z.array(z.record(z.string().or(z.number()), z.any()))


export type Dataset = z.infer<typeof zDataset>