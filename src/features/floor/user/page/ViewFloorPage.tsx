import { Layer, Stage } from "react-konva";
import { Compartment } from "../../../compartments/components/Compartment.tsx";
import { useGetCompartmentsByFloorIdQuery } from "../../../compartments/api/compartmentsApi.ts";
import { LoadingOverlay } from "@mantine/core";
import { Route } from "../../../../routes/floors/$sequence.tsx";
import { createSelector } from "@reduxjs/toolkit";
import { BaseQueryFn, TypedUseQueryStateResult } from "@reduxjs/toolkit/query/react";
import { Floor } from "../../floor.ts";
import { useGetFloorsQuery } from "../../api/floorApi.ts";
import { useEffect } from "react";

type GetFloorSelectFromResultArg = TypedUseQueryStateResult<Floor[], unknown, BaseQueryFn>;

const selectFloor = createSelector(
    (res: GetFloorSelectFromResultArg) => res.data,
    (_res: GetFloorSelectFromResultArg, sequence: number) => sequence,
    (data, sequence) => data?.find(floor => floor.sequence === sequence)
)

export const ViewFloorPage = () => {
    const { sequence } = Route.useParams();
    const { floor, isLoading: isFloorLoading } = useGetFloorsQuery(undefined, {
        selectFromResult: result => ( { ...result, floor: selectFloor(result, Number(sequence)) } )
    });
    const { data, isLoading : isCompartmentsLoading } = useGetCompartmentsByFloorIdQuery(floor?.id, { skip: !floor });

    useEffect(() => {
        document.title = `PRMTS - ${floor?.name} Floor`;
    }, [floor]);

    return (
        <>
            <LoadingOverlay visible={ isCompartmentsLoading || isFloorLoading } zIndex={ 1000 }/>
            <Stage width={ window.innerWidth } height={ window.innerHeight }>
                <Layer>
                    { data && data.map(({ id, konvaSpec }) => (
                        <Compartment key={ id } compartmentId={id} compartmentConfig={ { ...konvaSpec } }/>
                    )) }
                </Layer>
            </Stage>
        </>
    )
}