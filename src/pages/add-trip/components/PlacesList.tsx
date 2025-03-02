import { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Typography,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Place } from '../../../models/Place';

const SortableItem = ({ id, index, place }: { id: string; index: number; place: Place }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.2s ease',
        zIndex: transform ? 10 : 'auto',
    };

    return (
        <ListItem
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex justify-between space-x-4 shadow-md rounded-lg mb-2"
        >
            <ListItemAvatar className="flex items-center space-x-4">
                <Typography variant="body2" className="mr-2">
                    {index + 1}
                </Typography>
                <Avatar>
                    <MapIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={place.name}
                secondary={`Lat: ${place.coordinates[0].toFixed(4)}, Long: ${place.coordinates[1].toFixed(4)}`}
            />
            <div className="flex space-x-6">
                <IconButton edge="end">
                    <DragHandleIcon />
                </IconButton>
                <IconButton edge="end">
                    <DeleteIcon />
                </IconButton>
            </div>
        </ListItem>
    );
};

const PlacesList = ({ places, onUpdate }: { places: Place[]; onUpdate: (updatedPlaces: Place[]) => void }) => {
    const [items, setItems] = useState(places);

    // Sync state with `places` prop whenever it changes
    useEffect(() => {
        setItems(places);
    }, [places]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const newItems = arrayMove(items, items.findIndex((item) => item.name === active.id), items.findIndex((item) => item.name === over.id));
            setItems(newItems);
            onUpdate(newItems);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items.map((item) => item.name)} strategy={rectSortingStrategy}>
                <List className='overflow-hidden p-0'>
                    {items.map((place, index) => (
                        <SortableItem key={place.name} id={place.name} index={index} place={place} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
};

export default PlacesList;
