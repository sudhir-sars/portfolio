const ColorPicker = ({key, handleColorChange, isVisible}) => {
  return (
    <>
    <div className="bg-green-500 w-5 h-5 rounded-full "  onClick={() => handleColorChange('bg-green-500',key)}></div>
              <div className="bg-red-500 w-5 h-5 rounded-full "  onClick={() =>handleColorChange('bg-red-500',key)}></div>
              <div className="bg-pink-500 w-5 h-5 rounded-full "  onClick={() => handleColorChange('bg-pink-500 ',key)}></div>
              <div className="bg-indigo-300 w-5 h-5 rounded-full "  onClick={() => handleColorChange('bg-indigo-300',key)}></div>
              <div className="bg-yellow-300 w-5 h-5 rounded-full "  onClick={() => handleColorChange('bg-yellow-300',key)}></div></>
  );
};

export default ColorPicker;
