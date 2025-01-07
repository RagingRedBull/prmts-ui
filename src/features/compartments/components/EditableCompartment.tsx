import Konva from "konva"
import {Rect, Transformer} from "react-konva";
import {ComponentProps, useEffect, useRef} from "react";

interface EditableCompartmentProps {
    compartmentConfig: Konva.RectConfig;
    isSelected: boolean;
    onChange: (a: Konva.RectConfig) => void;
    onSelect: () => void;
}

export const EditableCompartment  = ({compartmentConfig, isSelected, onSelect, onChange} : EditableCompartmentProps) => {
    const rectRef: ComponentProps<typeof Rect>['ref']  = useRef(null) ;
    const transformerRef: ComponentProps<typeof Transformer>['ref']  = useRef(null);

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            // @ts-expect-error ignore null issue
            transformerRef.current.nodes([rectRef.current]);
            // @ts-expect-error ignore null issue
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected])

        return (
                <>
                    <Rect
                        onClick={onSelect}
                        onTap={onSelect}
                        ref={rectRef}
                        {...compartmentConfig}
                        draggable
                        onDragEnd={(e) => {
                            onChange({
                                ...compartmentConfig,
                                x: e.target.x(),
                                y: e.target.y(),
                            });
                        }}
                        onTransformEnd={() => {
                            // transformer is changing scale of the node
                            // and NOT its width or height
                            // but in the store we have only width and height
                            // to match the data better we will reset scale on transform end
                            const node = rectRef.current;
                            // @ts-expect-error ignore null issue
                            const scaleX = node.scaleX();
                            // @ts-expect-error ignore null issue
                            const scaleY = node.scaleY();

                            // we will reset it back
                            // @ts-expect-error ignore null issue
                            node.scaleX(1);
                            // @ts-expect-error ignore null issue
                            node.scaleY(1);
                            onChange({
                                ...compartmentConfig,
                                // @ts-expect-error ignore null issue
                                x: node.x(),
                                // @ts-expect-error ignore null issue
                                y: node.y(),
                                // set minimal value
                                // @ts-expect-error ignore null issue
                                width: Math.max(5, node.width() * scaleX),
                                // @ts-expect-error ignore null issue
                                height: Math.max(node.height() * scaleY),
                            });
                        }}
                    />
                    {isSelected && (
                        <Transformer
                            ref={transformerRef}
                            flipEnabled={false}
                            boundBoxFunc={(oldBox, newBox) => {
                                // limit resize
                                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        />
                    )}
                </>
        )
}