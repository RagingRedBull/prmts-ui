import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";

const baseQuery = retry(fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
}), {maxRetries: 5});

export const prmtsApi = createApi({
    reducerPath: 'prmtsApi',
    baseQuery: baseQuery,
    endpoints: () => ({})
})