import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { GridWrapper } from "./components/common/GridWrapper.tsx";
import { Item } from "./components/common/Item.tsx";
import { RootWrapper } from "./components/common/RootWrapper.tsx";
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { DraggableCard } from "./components/features/DraggableCard.tsx";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
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
              <DraggableCard key={id} id={id}>
                {id}
              </DraggableCard>
            ))}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId ? <Item id={activeId}>{activeId}</Item> : null}
          </DragOverlay>
        </DndContext>
      </GridWrapper>
    </RootWrapper>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

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
