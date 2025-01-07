import { Layer, Stage } from "react-konva";
import { useGetCompartmentsByFloorIdQuery } from "../../../compartments/api/compartmentsApi.ts";
import { LoadingOverlay } from "@mantine/core";
import { Route } from "../../../../routes/floors/$sequence.tsx";
import { createSelector } from "@reduxjs/toolkit";
import { BaseQueryFn, TypedUseQueryStateResult } from "@reduxjs/toolkit/query/react";
import { Floor } from "../../floor.ts";
import { useGetFloorsQuery } from "../../api/floorApi.ts";
import { EditableCompartment } from "../../../compartments/components/EditableCompartment.tsx";

type GetFloorSelectFromResultArg = TypedUseQueryStateResult<Floor[], unknown, BaseQueryFn>;

const selectFloor = createSelector(
    (res: GetFloorSelectFromResultArg) => res.data,
    (_res: GetFloorSelectFromResultArg, sequence: number) => sequence,
    (data, sequence) => data?.find(floor => floor.sequence === sequence)
)

export const EditFloorPage = () => {
    const { floor } = useGetFloorsQuery(undefined, {
        selectFromResult: result => ( { ...result, floor: selectFloor(result, Number(5)) } )
    });
    const { data, isLoading } = useGetCompartmentsByFloorIdQuery(floor?.id, { skip: !floor });

    return (
        <>
            <LoadingOverlay visible={ isLoading } zIndex={ 1000 }/>
            <Stage width={ window.innerWidth } height={ window.innerHeight }>
                <Layer>
                    { data && data.map(({ id, konvaSpec }) => (
                        <EditableCompartment key={ id }
                                             compartmentConfig={ { ...konvaSpec } }
                        />
                    )) }
                </Layer>
            </Stage>
        </>
    )
}