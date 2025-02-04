'use client'

import Box from '@mui/material/Box';
import Slider, { SliderValueLabelProps } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
} 

type CustomSliderTypes = {
    label: string;
    value: number;
    onChange: (event: Event, value: number | number[]) => void;
}

export default function CustomizedSlider({ label, value, onChange }: CustomSliderTypes) {
  return (
    <Box>
      <Typography style={{ fontSize: '0.8rem' }} gutterBottom>{label}</Typography>
      <Slider 
        slots={{
          valueLabel: ValueLabelComponent,
        }}
        size="small"
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={0}
        max={360}
        value={typeof value === 'number' ? value : 0}
        onChange={onChange}
      />
    </Box>
  );
}
