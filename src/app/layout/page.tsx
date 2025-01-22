"use client"
import React, { useState } from 'react';

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const LayoutBuilder: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 20) * 20; // Snap to 20px grid
    const y = Math.round((e.clientY - rect.top) / 20) * 20;
    setStartPoint({ x, y });
    setDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!startPoint) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / 20) * 20; // Snap to 20px grid
    const y = Math.round((e.clientY - rect.top) / 20) * 20;

    // Snap to 90 degrees
    const dx = Math.abs(x - startPoint.x);
    const dy = Math.abs(y - startPoint.y);
    const endX = dx > dy ? x : startPoint.x; // Snap horizontal
    const endY = dy >= dx ? y : startPoint.y; // Snap vertical

    setLines((prev) => [...prev, { startX: startPoint.x, startY: startPoint.y, endX, endY }]);
    setStartPoint(null);
    setDrawing(false);
  };

  const addFeature = (feature: string) => {
    alert(`Feature "${feature}" added!`); // Placeholder for real logic
  };

  const resetFloorplan = () => {
    setLines([]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#090F4C', color: '#CCB577' }}>
      {/* Left side for canvas */}
      <div style={{ flex: 3, padding: '20px' }}>
        <h1>Create Your Room Layout Here</h1>
        <p>Draw lines to design the room layout. Use the buttons to add features.</p>
        <div
          id="canvas"
          style={{
            position: 'relative',
            width: '800px',
            height: '600px',
            backgroundColor: '#444',
            border: '1px solid #666',
            marginTop: '20px',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Grid with labels */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(40, 20px)', // 40 columns, 20px each
              gridTemplateRows: 'repeat(30, 20px)', // 30 rows, 20px each
            }}
          >
            {/* Render numeric labels */}
            {Array.from({ length: 30 }, (_, row) =>
              Array.from({ length: 40 }, (_, col) => (
                <div
                  key={`${row}-${col}`}
                  style={{
                    border: '1px solid #555',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: row === 0 || col === 0 ? '10px' : '0', // Show labels only on the first row/column
                    color: '#aaa',
                  }}
                >
                  {row === 0 && col > 0 ? col : col === 0 && row > 0 ? row : ''}
                </div>
              ))
            )}
          </div>

          {/* Render lines */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none', // Prevent interference with mouse events on the canvas
            }}
          >
            {/* Draw existing lines */}
            {lines.map((line, index) => (
              <line
                key={index}
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke="white" // Line color
                strokeWidth="2" // Line thickness
              />
            ))}

            {/* Draw a preview line while the user is dragging */}
            {drawing && startPoint && (
              <line
                x1={startPoint.x}
                y1={startPoint.y}
                x2={startPoint.x}
                y2={startPoint.y}
                stroke="lightblue"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Right side for feature buttons */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#222', borderLeft: '1px solid #444', position: 'relative' }}>
        <h2>Features</h2>
        <p>Select features to add to the layout:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => addFeature('Door')} style={buttonStyle}>
            Door
          </button>
          <button onClick={() => addFeature('Window')} style={buttonStyle}>
            Window
          </button>
          <button onClick={() => addFeature('Hallway')} style={buttonStyle}>
            Hallway
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={resetFloorplan}
          style={{
            ...buttonStyle,
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#ff5555',
          }}
        >
          Reset Floorplan
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#555',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textAlign: 'center',
};

export default LayoutBuilder;
