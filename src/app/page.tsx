/* eslint-disable @next/next/no-img-element */
'use client'

import CustomCollapse from '@/components/CustomCollapse';
import CustomizedSlider from '@/components/CustomSlider';
import { Image, Save } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import styles from './page.module.css';

export default function Home() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(27,27,28,1) 0%, RGB(33, 33, 33) 100%)');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<
    {
      src: string; // URL base64 da imagem
      rotX: number;
      rotY: number;
      rotZ: number;
      locX: number;
      locY: number;
      locZ: number;
      scale: number;
    }[]
  >([]); 

  const handleImportImage = () => {
    // Dispara o clique no input de arquivo
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [
          ...prevImages,
          {
            src: reader.result as string,
            rotX: 0,
            rotY: 0,
            rotZ: 0,
            locX: 0,
            locY: 0,
            locZ: 0,
            scale: 100,
          },
        ]);
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
    }
  };

  const updateImageProperty = (
    index: number,
    property: keyof typeof images[0],
    value: number
  ) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, [property]: value } : image
      )
    );
  };

const viewportRef = useRef<HTMLDivElement | null>(null);
const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

useEffect(() => {
  const updateViewportSize = () => {
    if (viewportRef.current) {
      const { width, height } = viewportRef.current.getBoundingClientRect();
      setViewportSize({ width, height });
    }
  };

  // Atualizar as dimensões ao montar o componente
  updateViewportSize();

  // Atualizar as dimensões ao redimensionar a janela
  window.addEventListener('resize', updateViewportSize);
  return () => window.removeEventListener('resize', updateViewportSize);
}, []);

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
          {images.map((image, index) => (
            <CustomCollapse title={`Image ${index + 1}`} key={index}>
              <div className={styles.field_group}>
                <span className={styles.title}>Rotation</span><br /><br />
                <CustomizedSlider
                  label="X"
                  min={-360}
                  max={360}
                  value={image.rotX}
                  onChange={(event, value) =>
                    updateImageProperty(index, "rotX", typeof value === "number" ? value : 0)
                  }
                />
                <CustomizedSlider
                  label="Y"
                  value={image.rotY}
                  min={-360}
                  max={360}
                  onChange={(event, value) =>
                    updateImageProperty(index, "rotY", typeof value === "number" ? value : 0)
                  }
                />
                <CustomizedSlider
                  label="Z"
                  value={image.rotZ}
                  min={-360}
                  max={360}
                  onChange={(event, value) =>
                    updateImageProperty(index, "rotZ", typeof value === "number" ? value : 0)
                  }
                />
              </div>

              <div className={styles.field_group}>
                <span className={styles.title}>Location</span><br /><br />
                <CustomizedSlider
                  label="X"
                  value={image.locX}
                  min={-viewportSize.width / 4}
                  max={viewportSize.width / 4}
                  onChange={(event, value) =>
                    updateImageProperty(index, "locX", typeof value === "number" ? value : 0)
                  }
                />
                <CustomizedSlider
                  label="Y"
                  value={image.locY}
                  min={-viewportSize.height / 4}
                  max={viewportSize.height / 4}
                  onChange={(event, value) =>
                    updateImageProperty(index, "locY", typeof value === "number" ? value : 0)
                  }
                />
                <CustomizedSlider
                  label="Z"
                  value={image.locZ}
                  min={-viewportSize.width / 2}
                  max={viewportSize.width / 2}
                  onChange={(event, value) =>
                    updateImageProperty(index, "locZ", typeof value === "number" ? value : 0)
                  }
                />
              </div>

              <div className={styles.field_group}>
                <span className={styles.title}>Scale</span><br /><br />
                <CustomizedSlider
                  label="Scale"
                  value={image.scale}
                  onChange={(event, value) =>
                    updateImageProperty(index, "scale", typeof value === "number" ? value : 100)
                  }
                />
              </div>
            </CustomCollapse>
          ))}

        </div>
      </aside>
      <section className={styles.viewport} style={{ background: color }} ref={viewportRef}>
        {images.map((image, index) => (
          <img
            src={image.src}
            key={index}
            className={styles.object}
            style={{
              transform: `rotateX(${image.rotX}deg) rotateY(${image.rotY}deg) rotateZ(${image.rotZ}deg) translate3d(${image.locX}px, ${image.locY}px, ${image.locZ}px) scale(${image.scale / 100})`,
            }}
            alt=""
          ></img>
        ))}
      </section>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Save"
          icon={<Save />}
          tooltipTitle="Save"
        />
        <SpeedDialAction
          key="Import Image"
          icon={<Image />}
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
