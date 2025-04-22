
import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchTasks, updateTask, Task } from '@/store/slices/tasksSlice';
import TaskCard from './TaskCard';
import TaskColumn from './TaskColumn';
import CreateTaskDialog from './CreateTaskDialog';

const TaskBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.tasks);
  const { currentWorkspace } = useAppSelector(state => state.workspaces);
  
  useEffect(() => {
    if (currentWorkspace) {
      dispatch(fetchTasks(currentWorkspace.id));
    }
  }, [dispatch, currentWorkspace]);
  
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Return if dropped outside of droppable area
    if (!destination) return;
    
    // Return if dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    // Handle the task status change
    const newStatus = destination.droppableId as 'todo' | 'inProgress' | 'done';
    const taskId = draggableId;
    
    dispatch(updateTask({
      taskId,
      updates: { status: newStatus }
    }));
  };
  
  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">Please select or create a workspace to view tasks.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{currentWorkspace.name}</h2>
        <CreateTaskDialog />
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <TaskColumn title="To Do" id="todo" count={todoTasks.length}>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${snapshot.isDraggingOver ? 'dropzone-active' : ''}`}
                >
                  {todoTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'dragging' : ''}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </TaskColumn>
          
          <TaskColumn title="In Progress" id="inProgress" count={inProgressTasks.length}>
            <Droppable droppableId="inProgress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${snapshot.isDraggingOver ? 'dropzone-active' : ''}`}
                >
                  {inProgressTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'dragging' : ''}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </TaskColumn>
          
          <TaskColumn title="Done" id="done" count={doneTasks.length}>
            <Droppable droppableId="done">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-3 min-h-[200px] ${snapshot.isDraggingOver ? 'dropzone-active' : ''}`}
                >
                  {doneTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'dragging' : ''}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </TaskColumn>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
