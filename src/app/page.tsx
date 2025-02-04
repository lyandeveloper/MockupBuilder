/* eslint-disable @next/next/no-img-element */
'use client'

import CustomCollapse from '@/components/CustomCollapse';
import CustomizedSlider from '@/components/CustomSlider';
import { Image, Save } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRef, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import styles from './page.module.css';

export default function Home() {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  const [locX, setLocX] = useState(0);
  const [locY, setLocY] = useState(0);
  const [locZ, setLocZ] = useState(0);

  const [color, setColor] = useState('linear-gradient(90deg, rgba(27,27,28,1) 0%, RGB(33, 33, 33) 100%)');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [scale, setScale] = useState(100);

  const handleImportImage = () => {
    // Dispara o clique no input de arquivo
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Define a imagem como base64
        console.log(reader.result)
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget; // Pega largura e altura originais
    setImageSize({ width: naturalWidth / window.innerWidth, height: naturalHeight / window.innerHeight });
  };

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <div className={styles.header}> 
          <span className={styles.title}>Mockup Builder</span>
        </div>
        <div className={styles.content}>
          <CustomCollapse title='Background'> 
            <ColorPicker 
              value={color} 
              onChange={setColor} 
              width={220} 
              height={150}
              hidePresets={true} 
              hideAdvancedSliders={true} 
              hideColorGuide={true}
              className={styles.color_picker} 
              disableLightMode={true}
            />
          </CustomCollapse>
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
                value={rotZ}
                onChange={(event, value) => setRotZ(typeof value === 'number' ? value : 0)}
              />
              <CustomizedSlider
                label="z"
                value={rotY}
                onChange={(event, value) => setRotY(typeof value === 'number' ? value : 0)}
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

            <div className={styles.field_group}>
              <span className={styles.title}>Scale</span><br /><br />
              <CustomizedSlider
                label="size"
                value={scale}
                onChange={(event, value) => setScale(typeof value === 'number' ? value : 100)}
              />
            </div> 
          </CustomCollapse>
        </div>
      </aside>
      <section className={styles.viewport} style={{ background: color }}>
        <img
          src={image}
          className={styles.object}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translate3d(${locX}px, ${locY}px, ${locZ}px) scale(${scale / 100})`,
          }} 
          alt=""
        ></img>

      </section>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      > 
        <SpeedDialAction
            key="Save"
            icon={<Save/>}
            tooltipTitle="Save"
        /> 
        <SpeedDialAction
          key="Import Image"
          icon={<Image/>}
          tooltipTitle="Import Image"
            onClick={handleImportImage}
        /> 
      </SpeedDial>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </main>
  );
}
