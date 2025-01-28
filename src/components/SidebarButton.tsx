"use client"

const SidebarButton = ({feature}: {feature: string}) => {
  const addFeature = (feature: string) => {
    alert(`Feature "${feature}" added!`); // Placeholder for real logic
  };

  return(
    <button className='bg-[#D9CAB3] hover:bg-[#CFBCA0] mx-5 py-4 text-lg rounded-md' onClick={() => addFeature(feature)}>
      {feature}
    </button>
  )
}

export default SidebarButton;