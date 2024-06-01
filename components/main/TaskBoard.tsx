'use client';
import React, { useEffect, useState } from 'react';
import TaskCard from '../sub/TaskCard';
import { MdAdminPanelSettings } from 'react-icons/md';
import { MdOutlineFileDownloadDone } from 'react-icons/md';

const TaskBoard: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex text-5xl text-nowrap pl-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-100">
        Task Board <MdAdminPanelSettings className="text-white ml-5" />
      </div>
      <div className="flex justify-center space-x-5 mt-16">
        <div>
          <TaskCard title="To Do" isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </div>
        <div>
          <TaskCard
            title="Under Progress"
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </div>
        <div>
          <TaskCard
            title="Accomplished"
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
