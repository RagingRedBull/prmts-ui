import Konva from "konva";
import {Layer, Stage} from "react-konva";
import {useState} from "react";
import {EditableCompartment} from "../../../compartments/components/EditableCompartment.tsx";

const sampleCompartments : Konva.RectConfig[] = [
    {
        x: 50,
        y: 20,
        height: 100,
        width: 100,
        stroke: 'black',
        id: "test1"
    },
    {
        x: 100,
        y: 20,
        height: 100,
        width: 100,
        stroke: 'black',
        id: "test2"
    },
    {
        x: 120,
        y: 20,
        height: 100,
        width: 100,
        stroke: 'black',
        id: "test3"
    },
]

export const EditFloorCanvas = () => {
    const [ selectedCompartment, setSelectedCompartment ] = useState<string | null>();
    const [compartments, setCompartments] = useState(sampleCompartments);

    const checkDeselect = (e: Konva.KonvaEventObject<Event>) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedCompartment(null);
        }
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}
               onMouseDown={checkDeselect}
               onTouchStart={checkDeselect}>
            <Layer>
                {/*<Compartment {...sampleCompartments[0]}/>*/}
                {
                    compartments.map((compartment, index) =>
                        (
                            <EditableCompartment
                                key={compartment.id}
                                compartmentConfig={compartment}
                                onSelect ={() => setSelectedCompartment(compartment.id)}
                                onChange={(compartmentAttributes: Konva.RectConfig ) => {
                                    const rects = compartments.slice();
                                    rects[index] = compartmentAttributes;
                                    setCompartments(rects);
                                }}
                                isSelected={selectedCompartment === compartment.id}/>
                        )
                    )
                }
            </Layer>
        </Stage>
    )
}