import React, { useState } from 'react';
import { Popover } from 'react-bootstrap';
import { BsStickiesFill } from 'react-icons/bs';
import { DrawingColors } from "../../utils/DrawingColor";
import { useEffect } from 'react';


const CustomStickyPopoverMain = ({  handleAddNote ,stageRef}) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const handleColorClick = (color) => {
    if (clickCount === 0) {
      // First click, select the color
      setSelectedColor(color);
      setClickCount(1);
      document.body.style.cursor = 'pointer';
    } else {
      setSelectedShape('Rectangle');
      setClickCount(0);
      document.body.style.cursor = 'auto'; // Set cursor back to default
    }
  };

  const handleBackgroundClick = (event) => {
    // Background click, generate rectangle
    const stage = stageRef.current;

    if (clickCount === 1) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        handleAddNote(200, 300, 'Rectangle', selectedColor, mouseX, mouseY,  stage);
        setSelectedShape('Rectangle');
        setClickCount(0);
        document.body.style.cursor = 'auto';
      }
  };

  useEffect(() => {
    if (clickCount === 1) {
      document.body.addEventListener('click', handleBackgroundClick);
    }

    return () => {
      document.body.removeEventListener('click', handleBackgroundClick);
    };
  }, [clickCount]);
 
  return (
    <Popover id="popover-basic" >
      <Popover.Body >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:'150px', height:'550px' }}>
          {DrawingColors.map((color, index) => (
            <div key={color.color} style={{ display: 'flex', margin: '3px' ,padding:'3px' }}>
              <div
                onClick={() => {
                    handleColorClick(color.color)
                }}
                style={{
                  backgroundColor: color.color,
                  borderRadius: '2px',
                  width: '50px', 
                  height: '50px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  boxShadow: selectedShape === color.color ? '0 0 0 2px #000' : 'none',
                }}
                title={color.title}
              ></div>
              <div
                onClick={() => {
                    handleColorClick(color.color)
                }}
                style={{
                  backgroundColor: color.color,
                  borderRadius: '2px',
                  width: '50px', 
                  height: '50px', 
                  cursor: 'pointer',
                  boxShadow: selectedShape === color.color ? '0 0 0 2px #000' : 'none',
                }}
                title={color.title}
              ></div>
            </div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopoverMain;
