'use client'

import CustomCollapse from '@/components/CustomCollapse';
import CustomizedSlider from '@/components/CustomSlider';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  const [locX, setLocX] = useState(0);
  const [locY, setLocY] = useState(0);
  const [locZ, setLocZ] = useState(0);

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <IconButton>
            <Menu style={{ color: "#FFF" }} />
          </IconButton>
          <span className={styles.title}>Mockup Builder</span>
        </div>
        <div className={styles.content}>
          <CustomCollapse title='Landing Page'>
            <div className={styles.field_group}>
              <span className={styles.title}>Rotation</span><br /><br />
              <CustomizedSlider
                label="x"
                value={rotX}
                onChange={(event, value) => setRotX(typeof value === 'number' ? value : 0)}
              />
              <CustomizedSlider
                label="y"
                value={rotY}
                onChange={(event, value) => setRotY(typeof value === 'number' ? value : 0)}
              />
              <CustomizedSlider
                label="z"
                value={rotZ}
                onChange={(event, value) => setRotZ(typeof value === 'number' ? value : 0)}
              />
            </div>

            <div className={styles.field_group}>
              <span className={styles.title}>Location</span><br /><br />
              <CustomizedSlider
                label="x"
                value={locX}
                onChange={(event, value) => setLocX(typeof value === 'number' ? value : 0)}
              />
              <CustomizedSlider
                label="y"
                value={locY}
                onChange={(event, value) => setLocY(typeof value === 'number' ? value : 0)}
              />
              <CustomizedSlider
                label="z"
                value={locZ}
                onChange={(event, value) => setLocZ(typeof value === 'number' ? value : 0)}
              />
            </div>
          </CustomCollapse>
        </div>
      </aside>
      <section className={styles.viewport}>
        <div
          className={styles.object}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translate3d(${locX}px, ${locY}px, ${locZ}px)`,
          }}
        ></div>

      </section>

    </main>
  );
}
