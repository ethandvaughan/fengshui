import Grid from '@/components/Grid';
import LayoutSidebar from '@/components/LayoutSidebar';
import React from 'react';
import styles from './styles.module.css';


const LayoutBuilder: React.FC = () => {

  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <h1 className='text-center text-xl font-bold p-5'>Create Your Room Layout Here</h1>
        <Grid />
      </div>
      <LayoutSidebar />
    </div>
  );
};

export default LayoutBuilder;
