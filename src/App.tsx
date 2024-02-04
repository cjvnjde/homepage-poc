import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { PropsWithChildren, useState } from "react";
import { css } from "../styled-system/css";
import { GridWrapper } from "./components/common/GridWrapper.tsx";
import { RootWrapper } from "./components/common/RootWrapper.tsx";
import {
  closestCenter, defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent, DragOverlay, DragStartEvent, DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};
const Card = ({ children, id }: PropsWithChildren<{ id: string }>) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={css({
        width: "100%",
        maxWidth: "220px",
        padding: "20px 16px 4px",
        borderRadius: "8px",
        background: "green",
        opacity: isDragging ? 0.5 : 1,
      })}
    >
      {children}
    </div>
  );
};

function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 30 }, (_, index) => String(index)),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <RootWrapper>
      <GridWrapper>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((id) => (
              <Card key={id} id={id} >{id}</Card>
            ))}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId ? <div
              className={css({
                width: "100%",
                maxWidth: "220px",
                padding: "20px 16px 4px",
                borderRadius: "8px",
                background: "green",
              })}
              id={activeId}>{activeId}</div> : null}
          </DragOverlay>
        </DndContext>
      </GridWrapper>
    </RootWrapper>
  );

  function handleDragStart(event: DragStartEvent) {
    const {active} = event;

    setActiveId(String(active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(String(active.id));
        const newIndex = items.indexOf(String(over.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}

export default App;
