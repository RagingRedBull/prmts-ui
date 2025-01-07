import { prmtsApi } from "../../../api/prmtsApi.ts";
import { Compartment, SensorLog } from "../compartment.ts";
import { Client } from '@stomp/stompjs';

export const compartmentsApi = prmtsApi.injectEndpoints({
    endpoints: (builder) => ( {
        getCompartmentsByFloorId: builder.query<Compartment[], string | undefined>({
            query: (floorId) => ( {
                url: '/compartments',
                params: {
                    floorId
                }
            })
        }),
        getCompartmentLog: builder.query<SensorLog[], string>({
            query: (compartmentId) => ({
                url: `/logs/compartments/${compartmentId}`,
            })
        }),
        test: builder.query<Compartment[], string | undefined>({
            query: (macAddress) => ( {
                url: `http://localhost:8080/logs/${macAddress}/latest`
            } ),
            extraOptions: {
                maxRetries: 0
            },
            async onCacheEntryAdded(
                _arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const stompClient = new Client({
                    brokerURL: 'ws://localhost:8080/log',
                    debug: function (str: string) {
                        console.log(str);
                    },
                    onConnect: () => {
                        stompClient.subscribe('/topic/greetings', (msg ) => {
                            if (!msg) return;
                            const o = JSON.parse(msg.body)
                            console.log('ws msg -- ', o);
                            updateCachedData((_draft) => {
                                return o;
                            })
                        })
                    },
                    // reconnectDelay: 5000,
                    heartbeatIncoming: 4000,
                    heartbeatOutgoing: 4000,
                });
                stompClient.activate();
                try {
                    await cacheDataLoaded;
                } catch (e) {
                    console.log(e)
                }
                await cacheEntryRemoved;
                await stompClient.deactivate();
            }
        })
    } )
})

export const { useGetCompartmentsByFloorIdQuery, useTestQuery, useGetCompartmentLogQuery } = compartmentsApi;