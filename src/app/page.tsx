/* eslint-disable @next/next/no-img-element */
'use client'

import CustomCollapse from '@/components/CustomCollapse';
import CustomizedSlider from '@/components/CustomSlider';
import { Image, Save } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';
import styles from './page.module.css';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';

export default function Home() {
  const [shadow, setShadow] = useState(false);
  const [color, setColor] = useState('linear-gradient(90deg, rgba(27,27,28,1) 0%, RGB(33, 33, 33) 100%)');
  const [rgbColor, setRgbColor] = useState<string>("0, 0, 0");
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
      shadowPosX: number;
      shadowPosY: number;
      shadowBlur: number;
      shadowSpread: number;
      shadowOpacity: number;
      shadowColor: string;
    }[]
  >([]);

  const handleImportImage = () => {
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
            shadowPosX: 0,
            shadowPosY: 0,
            shadowBlur: 20,
            shadowSpread: 5,
            shadowOpacity: 1,
            shadowColor: "0,0,0"
          },
        ]);
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL base64
    }
  };

  const updateImageProperty = (index: number, property: string, value: number | string) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = {
        ...updatedImages[index],
        [property]: value,
      };
      return updatedImages;
    });
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    console.log(hexToRgb(hex))
    return hexToRgb(hex); // Converte para RGB
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
    <main className={styles.main} style={{ background: color }}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <span className={styles.title}>Mockup Builder</span>
        </div>
        <div className={styles.content}>
          <SimpleTreeView>
            <TreeItem itemId='background' label={<span style={{ fontSize: "0.8rem"}}>Background</span>}>
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
            </TreeItem>
            {images.map((image, index) => (
              <TreeItem itemId={`image_${index}`} label={<span style={{ fontSize: "0.8rem"}}>{`Image_${index}`}</span>} key={index}>
                <div className={styles.field_group}>
                  <span>Position</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.locX} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "locX",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>X</span>
                  </div>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.locY} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "locY",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>Y</span>
                  </div>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.locZ} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "locZ",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>Z</span>
                  </div>
                </div>
                <div className={styles.field_group}>
                  <span>Rotation</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.rotX} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "rotX",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>X</span>
                  </div>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.rotY} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "rotY",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>Y</span>
                  </div>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.rotZ} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "rotZ",
                          Number(event.target.value) // Converte para número
                        )
                      } 
                    />
                    <span>Z</span>
                  </div>
                </div>
                <div className={styles.field_group}>
                  <span>Scale</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      value={image.scale} 
                      min={0}
                      max={100}
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "scale",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                  </div>
                </div>
                <TreeItem itemId='shadow' label={<span style={{ fontSize: "0.8rem"}}>Shadow</span>}>
                <div className={styles.field_group}>
                  <span>Position</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.shadowPosX} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowPosX",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>X</span>
                  </div>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      name="" 
                      id="" 
                      value={image.shadowPosY} 
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowPosY",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                    <span>Y</span>
                  </div> 
                </div>
                <div className={styles.field_group}>
                  <span>Opacity</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      value={image.shadowOpacity} 
                      min={0}
                      max={1}
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowOpacity",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                  </div>
                </div>
                <div className={styles.field_group}>
                  <span>Spread</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      value={image.shadowSpread} 
                      min={0}
                      max={100}
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowSpread",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                  </div>
                </div>
                <div className={styles.field_group}>
                  <span>Blur</span>
                  <div className={styles.input}>
                    <input 
                      type="number" 
                      value={image.shadowBlur} 
                      min={0}
                      max={100}
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowBlur",
                          Number(event.target.value) // Converte para número
                        )
                      }
                    />
                  </div>
                </div>
                <div className={styles.field_group}>
                  <span>Color</span>
                  <div className={styles.input}>
                    <input 
                      type="color" 
                      value={image.shadowColor} 
                      min={0}
                      max={100}
                      onChange={(event) =>
                        updateImageProperty(
                          index,
                          "shadowColor",
                          handleColorChange(event) // Converte para número
                        )
                      }
                    />
                  </div>
                </div>
                </TreeItem>
              </TreeItem>
            ))
            }
          </SimpleTreeView>
        </div>
      </aside>
      <section className={styles.viewport} ref={viewportRef}>
        {images.map((image, index) => (
          <img
            src={image.src}
            key={index}
            className={styles.object}
            style={{
              transform: `rotateX(${image.rotX}deg) rotateY(${image.rotY}deg) rotateZ(${image.rotZ}deg) translate3d(${image.locX}px, ${image.locY}px, ${image.locZ}px) scale(${image.scale / 100})`,
              boxShadow: shadow ? `${image.shadowPosX}px ${image.shadowPosY}px ${image.shadowBlur}px ${image.shadowSpread}px rgba(${image.shadowColor}, ${image.shadowOpacity})` : 'none'
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
