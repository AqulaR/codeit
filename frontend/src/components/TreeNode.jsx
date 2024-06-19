import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'FILE';

function TreeNode({ node, onMove }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: node.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item) => onMove(item.id, node.id),
    });

    // console.log("ret");
    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div ref={drop}>
                {node.name}
            </div>
        </div>
    );
}

export default TreeNode;