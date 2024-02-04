import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren } from "react";
import { css } from "../../../styled-system/css";
import { Item } from "../common/Item.tsx";

export const DraggableCard = ({
  children,
  id,
}: PropsWithChildren<{ id: string }>) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={css({
        opacity: isDragging ? 0.5 : 1,
      })}
    >
      {children}
    </Item>
  );
};
