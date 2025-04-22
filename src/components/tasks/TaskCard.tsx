import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { useAppDispatch } from '@/hooks/use-redux';
import { deleteTask, Task, updateTask } from '@/store/slices/tasksSlice';
import { MoreHorizontal, Calendar, Trash, Edit } from 'lucide-react';
import TaskDetailDialog from './TaskDetailDialog';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };
  
  const handleClick = () => {
    setIsDetailOpen(true);
  };
  
  return (
    <>
      <Card className="task-card cursor-pointer hover:border-workmate-300 transition-colors" onClick={handleClick}>
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm mb-2">{task.title}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setIsDetailOpen(true); }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex items-center justify-between">
          <div className="flex space-x-1">
            <span className={`task-tag ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(task.dueDate, 'MMM d')}</span>
            </div>
          )}
        </CardFooter>
      </Card>
      
      <TaskDetailDialog 
        task={task} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};

export default TaskCard;
