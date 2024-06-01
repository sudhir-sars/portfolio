'use client';
import React, { useEffect, useState } from 'react';
import GitActiveRepos from '../sub/GitActiveRepos';
import GitCommits from '../sub/GitCommits';
import OpenSourceContributions from '../sub/GitOpenSourceContributions';

const GitBoard: React.FC = () => {
  return (
    <div className="text-white z-[50]">
      <div className="flex justify-center">
        <div className="w-[85vw] px-5 flex justify-end text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-100">
          Git Board
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[90vw] mt-2 rounded-full flex justify-end h-1 bg-gradient-to-r from-purple-500 to-cyan-100"></div>
      </div>

      <div className="flex justify-center mt-3">
        <div className="w-[85vw] flex">
          <div className="w-[45vw]">
            <GitActiveRepos />
            <OpenSourceContributions />
          </div>
          <div className="w-[35vw]">
            <GitCommits />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitBoard;
