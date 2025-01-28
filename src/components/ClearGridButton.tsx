"use client"

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function ClearGridButton({setLines}: {setLines:  React.Dispatch<React.SetStateAction<Line[]>>}) {

  const resetFloorplan = () => {
    setLines([]);
    console.log("Lines reset");
  };


  return(
    <button
          onClick={resetFloorplan}
          className="absolute bottom-20 left-10 bg-[#FF5555] hover:bg-[#FF3333] p-3 rounded-md"
        >
          Reset Floorplan
        </button>
  );
}
