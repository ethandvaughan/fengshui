import SidebarButton from "./SidebarButton";

const LayoutSidebar: React.FC = () => {
  return(
      <div className="bg-[#90323D] flex flex-col gap-4">
        <h2 className='text-center font-bold p-5'>Features</h2>
        <div className='flex flex-col justify-around h-1/3'>
          <SidebarButton feature="Hallway" />
          <SidebarButton feature="Door" />
          <SidebarButton feature="Window" />
        </div>
      </div>
  );
}

export default LayoutSidebar;