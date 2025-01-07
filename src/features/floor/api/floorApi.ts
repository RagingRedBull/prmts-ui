import {prmtsApi} from "../../../api/prmtsApi.ts";
import {Floor} from "../floor.ts";

export const floorApi = prmtsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFloors: builder.query<Floor[], void>({
            query : () => '/floors',
            keepUnusedDataFor: Number.MAX_VALUE
        })
    })
})

export const {useGetFloorsQuery} = floorApi;