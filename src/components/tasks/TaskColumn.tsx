
import React from 'react';

interface TaskColumnProps {
  title: string;
  id: string;
  count: number;
  children: React.ReactNode;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, id, count, children }) => {
  return (
    <div className="kanban-column">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm">{title}</h3>
        <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
};

export default TaskColumn;
