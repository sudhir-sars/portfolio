'use client';
import React, { useState, useEffect } from 'react';
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import TaskItem from '../sub/TaskItem';
import { MdAdminPanelSettings } from 'react-icons/md';

interface TaskCardProps {
  title: string;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>; // Assuming setIsAdmin is a setter function for isAdmin
}

interface Item {
  _id?: number;
  title: string;
  color: string;
  status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, isAdmin, setIsAdmin }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [addButtonClick, setAddButtonClick] = useState<boolean>(false);
  const [addItemTitle, setAddItemTitle] = useState<string>('');
  const [itemColor, setItemColor] = useState<string>('bg-red-500');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/taskItem');
        const data = await res.json();
        if (res.ok) {
          const filteredItems: Item[] = data.data.filter((item: Item) => {
            if (title === 'To Do') return item.status === 'to do';
            if (title === 'Under Progress')
              return item.status === 'in progress';
            if (title === 'Accomplished') return item.status === 'completed';
            return false;
          });
          setItems(filteredItems);
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error: any) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [title]);

  const addItem = async () => {
    if (addItemTitle.trim()) {
      // Check if the input title matches the admin password
      if (addItemTitle === 'shyama') {
        setIsAdmin(true);
        setAddItemTitle('');
        setAddButtonClick(false);
        console.log(isAdmin);
        return; // Exit the function early after setting isAdmin to true
      }

      // Default status value
      let status = 'to do';
      if (title === 'Under Progress') status = 'in progress';
      else if (title === 'Accomplished') status = 'completed';

      const newItem: Item = {
        title: addItemTitle,
        color: itemColor,
        status: status,
      };

      if (isAdmin) {
        try {
          const res = await fetch('http://localhost:3000/api/taskItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
          });

          if (res.ok) {
            const data = await res.json();
            setItems([...items, data.data]);
          } else {
            console.error('Failed to add item');
          }
        } catch (error: any) {
          console.error('Error adding item:', error);
        }
      } else {
        // Assign ID only if the database operation is not occurring
        newItem._id = Math.floor(Math.random() * 100000); // Use today's date as _id
        setItems([...items, newItem]); // Add the new item to local state
        console.log(items);
      }

      // Reset input fields
      setAddItemTitle('');
      setAddButtonClick(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (isAdmin) {
      try {
        const res = await fetch('http://localhost:3000/api/taskItem', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          const updatedItems = items.filter((item) => item._id !== id);
          setItems(updatedItems);
        } else {
          console.error('Failed to delete item');
        }
      } catch (error: any) {
        console.error('Error deleting item:', error);
      }
    } else {
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
    }
  };

  const updateItemColor = async (id: number, color: string) => {
    console.log('here');
    console.log(id);
    console.log(items);
    try {
      // Update item color locally
      setItems((prevItems: Item[]) =>
        prevItems.map((item) => (item._id === id ? { ...item, color } : item))
      );
    } catch (error: any) {
      console.error('Error updating item color:', error);
    }
  };

  const closeAddItem = () => {
    setAddItemTitle('');
    setAddButtonClick(false);
  };

  return (
    <div className="flex flex-col w-[25vw] text-white items-start space-y-2 border-2 border-gray-500 rounded-xl px-3 text-2xl py-4">
      <div className="ml-6 mb-5">{title}</div>
      <div className="flex flex-col flex-grow overflow-y-auto w-full px-2 max-h-[50vh]">
        <div className="space-y-2">
          {items.map((item) => (
            <TaskItem
              key={item._id}
              item={item}
              deleteItem={deleteItem}
              updateItemColor={updateItemColor}
            />
          ))}
        </div>
      </div>
      {!addButtonClick ? (
        <div className="px-2 pr-3">
          <button
            onClick={() => setAddButtonClick(true)}
            className="button-primary w-full flex justify-center p-2 rounded-xl text-xl items-center space-x-2"
          >
            <span className="text-2xl">
              <IoAddOutline />
            </span>
            <span className="pr-8">Add item</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center w-full space-x-2 relative pb-8 px-2 pr-3">
          <div className="button-primary rounded-lg flex w-full">
            <input
              type="text"
              onChange={(e) => setAddItemTitle(e.target.value)}
              value={addItemTitle}
              className="w-full px-3 py-2 text-xl outline-none bg-transparent"
              placeholder="Enter item title"
            />
            <div className={`${itemColor} w-[4%] my-1 mr-1 rounded-lg`} />
          </div>
          <div className="py-2 space-x-1 flex items-center absolute top-11 rounded-t-none bg-[#260b59] right-6 text-3xl rounded-lg px-2 z-10">
            <div
              className="bg-green-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => setItemColor('bg-green-500')}
            ></div>
            <div
              className="bg-red-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => setItemColor('bg-red-500')}
            ></div>
            <div
              className="bg-pink-500 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => setItemColor('bg-pink-500')}
            ></div>
            <div
              className="bg-indigo-300 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => setItemColor('bg-indigo-300')}
            ></div>
            <div
              className="bg-yellow-300 w-5 h-5 rounded-full cursor-pointer"
              onClick={() => setItemColor('bg-yellow-300')}
            ></div>

            <button
              onClick={closeAddItem}
              className="mx-1 button-primary rounded-lg text-2xl"
            >
              <IoCloseOutline className="rounded-lg hover:bg-red-500" />
            </button>
            <button
              onClick={addItem}
              className="mx-1 button-primary rounded-lg text-2xl"
            >
              <MdOutlineFileDownloadDone />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
