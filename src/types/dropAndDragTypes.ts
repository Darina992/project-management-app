import {
  DragEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  TouchEventHandler,
} from 'react';

export interface IDropProvided {
  droppableProps: IDroppableProps;
  innerRef: () => HTMLElement;
  placeholder: ReactElement;
}
interface IDroppableProps {
  'data-rbd-droppable-id': string;
  'data-rbd-droppable-context-id': string;
}
export interface IDragProvided {
  innerRef: React.Ref<HTMLDivElement>;
  draggableProps: IDraggableProps;
  dragHandleProps: DragHandleProps;
}
export interface IDraggableProps {
  'data-rbd-draggable-id': string;
  'data-rbd-draggable-context-id': string;
  style: DraggingStyle;
}
export type DragHandleProps = {
  onFocus: FocusEventHandler<HTMLDivElement>;
  onBlur: () => void;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  tabIndex: number;
  'data-rbd-drag-handle-draggable-id': string;
  'data-rbd-drag-handle-context-id': string;
  role: string;
  'aria-describedby': string;
  draggable: boolean;
  onDragStart: DragEventHandler<HTMLDivElement>;
};
type MovementMode = 'FLUID' | 'SNAP';
type DropReason = 'DROP' | 'CANCEL';

export type DropResult = {
  draggableId: string;
  type: string;
  source: DraggableLocation;
  mode: MovementMode;
  reason: DropReason;
  destination: DraggableLocation;
  combine: Combine;
};

type DraggableLocation = {
  droppableId: string;
  index: number;
};
type Combine = {
  draggableId: string;
  droppableId: string;
};
export type DraggableStateSnapshot = {
  isDragging: boolean;
  isDropAnimating: boolean;
  draggingOver: string;
  combineWith: string;
  combineTargetFor: string;
  mode: MovementMode;
};
export type DroppableStateSnapshot = {
  isDraggingOver: boolean;
  draggingOverWith: string;
  draggingFromThisWith: string;
  isUsingPlaceholder: boolean;
};
export type DraggingStyle = {
  position: 'fixed';
  top: number;
  left: number;
  boxSizing: 'border-box';
  width: number;
  height: number;
  transition: string;
  transform: string;
  zIndex: number;
  opacity: number;
  pointerEvents: 'none';
};
