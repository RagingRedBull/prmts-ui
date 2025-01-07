import Konva from "konva";
import { Rect } from "react-konva";
import { useGetCompartmentLogQuery } from "../api/compartmentsApi";

export interface CompartmentProps {
    compartmentId: string;
    compartmentConfig: Konva.RectConfig
}

export const Compartment = ({compartmentId, compartmentConfig}: CompartmentProps) => {
    const {data} = useGetCompartmentLogQuery(compartmentId, { pollingInterval: 3000 });
    const tempAvg = data && data
        .filter(x => x.type.includes("DHT"))
        .map(x => x.value)
        .reduce((avg, value, _, { length }) => avg + value / length, 0);
    const fillColor = tempAvg && tempAvg > 25 ? "red" : "green";

    return (
        <Rect
            {...compartmentConfig}
            fill={ fillColor }
            stroke={'black'}
        />
    )
}