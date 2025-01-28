"use client";
import { useState } from "react";
import { Coordinate, Room } from "@/app/utils"; // Import your classes

export default function Grid() {
  const [currentPerimeter, setCurrentPerimeter] = useState<Coordinate[]>([]);
  const [drawingPoint, setDrawingPoint] = useState<Coordinate | null>(null); // Tracks the current dynamic line
  const [room, setRoom] = useState<Room | null>(null);
  const gridSize = 20; // Size of each grid cell in pixels

  const handleMouseClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / gridSize) * gridSize; // Snap to grid
    const y = Math.round((e.clientY - rect.top) / gridSize) * gridSize;
    const newPoint = new Coordinate(x, y);

    // Check if we're closing the loop
    if (
      currentPerimeter.length > 0 &&
      newPoint.equals(currentPerimeter[0])
    ) {
      try {
        const newRoom = new Room([...currentPerimeter, newPoint]);
        setRoom(newRoom);
        setCurrentPerimeter([]); // Clear the perimeter
        setDrawingPoint(null); // Clear the dynamic line
      } catch {
        alert("Error");
      }
      return;
    }

    // Add the new point
    setCurrentPerimeter((prev) => [...prev, newPoint]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentPerimeter.length === 0) return; // No line to draw yet

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / gridSize) * gridSize; // Snap to grid
    const y = Math.round((e.clientY - rect.top) / gridSize) * gridSize;

    const lastPoint = currentPerimeter[currentPerimeter.length - 1];

    // Snap to 90º by comparing deltas
    const dx = Math.abs(x - lastPoint.x);
    const dy = Math.abs(y - lastPoint.y);
    const snapX = dx > dy ? x : lastPoint.x; // Horizontal snap
    const snapY = dy >= dx ? y : lastPoint.y; // Vertical snap

    setDrawingPoint(new Coordinate(snapX, snapY));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      // Cancel current drawing
      setCurrentPerimeter([]);
      setDrawingPoint(null);
    }
  };

  return (
    <div
      id="canvas"
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make the div focusable for keyboard events
      className="relative grid place-content-center mb-5 min-w-[400px] h-[600px] outline-none"
    >
      {/* Grid with labels */}
      <div
        className="relative grid grid-cols-[repeat(40,20px)] grid-rows-[repeat(30,20px)] bg-black"
        style={{
          width: `${40 * gridSize}px`,
          height: `${30 * gridSize}px`,
        }}
      >
        {Array.from({ length: 30 }, (_, row) =>
          Array.from({ length: 40 }, (_, col) => (
            <div
              key={`${row}-${col}`}
              className="border border-solid border-[#555] flex justify-center items-center text-[10px] text-[#aaa]"
            >
              {row === 0 && col > 0 ? col : col === 0 && row > 0 ? row : ""}
            </div>
          ))
        )}
      </div>

      {/* Render current perimeter lines */}
      <svg
        className="absolute top-0 left-0"
        style={{
          width: `${40 * gridSize}px`,
          height: `${30 * gridSize}px`,
        }}
      >
        {currentPerimeter.map((point, index) => {
          if (index === 0) return null; // Skip the first point for drawing lines
          const prevPoint = currentPerimeter[index - 1];
          return (
            <line
              key={index}
              x1={prevPoint.x}
              y1={prevPoint.y}
              x2={point.x}
              y2={point.y}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Dynamic line from last point to mouse position */}
        {drawingPoint && currentPerimeter.length > 0 && (
          <line
            x1={currentPerimeter[currentPerimeter.length - 1].x}
            y1={currentPerimeter[currentPerimeter.length - 1].y}
            x2={drawingPoint.x}
            y2={drawingPoint.y}
            stroke="lightblue"
            strokeWidth="2"
            strokeDasharray="5,5" // Dashed line for preview
          />
        )}

        {/* If the loop is closed, draw the last line */}
        {currentPerimeter.length > 1 && (
          <line
            x1={currentPerimeter[currentPerimeter.length - 1].x}
            y1={currentPerimeter[currentPerimeter.length - 1].y}
            x2={currentPerimeter[0].x}
            y2={currentPerimeter[0].y}
            stroke="white"
            strokeWidth="2"
          />
        )}
      </svg>

      {room && (
        <div className="absolute top-0 right-0 bg-white p-2 text-black">
          <h2>Room Details:</h2>
          <pre>{room.print()}</pre>
        </div>
      )}
    </div>
  );
}
