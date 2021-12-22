import React, { createContext, useContext, useState } from 'react';

const TaskProviderContext = createContext({} as any);

export function TaskFlag({ children }: any) {
  const [flagUpdateTasks, setFlagUpdateTasks] = useState(true);
  return (
    <TaskProviderContext.Provider
      value={{ flagUpdateTasks, setFlagUpdateTasks }}
    >
      {children}
    </TaskProviderContext.Provider>
  );
}

export const useTaskFlag = () => useContext(TaskProviderContext);
