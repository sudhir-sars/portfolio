import React, { useState } from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

interface Item {
  id: number;
  title: string;
  color: string;
  status: string;
}

const TaskItem: React.FC<{
  item: Item;
  deleteItem: (key: number) => void;
  updateItemColor: (key: number, color: string) => void;
}> = ({ item, deleteItem, updateItemColor }) => {
  const [strikeButtonHover, setStrikeButtonHover] = useState<boolean>(false);
  const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false);

  return (
    <>
      <div
        key={item.id}
        className={`button-primary rounded-xl text-xl flex items-center justify-between relative w-full`}
      >
        <div className="flex items-center p-2">
          <div
            onClick={() => deleteItem(item.id)}
            onMouseEnter={() => setStrikeButtonHover(true)}
            onMouseLeave={() => setStrikeButtonHover(false)}
            className="mx-2 text-[1rem]"
          >
            {strikeButtonHover ? (
              <FaCircle className="text-[#af73f8]" />
            ) : (
              <FaRegCircle />
            )}
          </div>
          <span className={`${strikeButtonHover ? 'line-through' : ''}`}>
            {item.title}
          </span>
        </div>
        <div
          onClick={() => setColorPickerVisible(!colorPickerVisible)}
          className={`${item.color} w-[4%] h-9 mr-1 rounded-lg cursor-pointer`}
        />
        {colorPickerVisible && (
          <div className="absolute top-11   right-4 rounded-t-none flex space-x-1 bg-[#260b59] p-2 rounded-lg z-10">
            <div
              className="bg-green-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => {
                updateItemColor(item.id, 'bg-green-500');
                setColorPickerVisible(false);
              }}
            ></div>
            <div
              className="bg-red-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => {
                updateItemColor(item.id, 'bg-red-500');
                setColorPickerVisible(false);
              }}
            ></div>
            <div
              className="bg-pink-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => {
                updateItemColor(item.id, 'bg-pink-500');
                setColorPickerVisible(false);
              }}
            ></div>
            <div
              className="bg-indigo-300 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => {
                updateItemColor(item.id, 'bg-indigo-300');
                setColorPickerVisible(false);
              }}
            ></div>
            <div
              className="bg-yellow-300 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => {
                updateItemColor(item.id, 'bg-yellow-300');
                setColorPickerVisible(false);
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskItem;
