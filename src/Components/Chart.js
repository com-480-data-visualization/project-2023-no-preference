import './Chart.css';

import { useRef, useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
//MUI
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { Container, Box, Tooltip, Typography } from '@mui/material';

export default function Chart() {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.backgroundColor = "white";
      canvas.style.borderRadius = "10px";
      canvas.style.minHeight = "70vh";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }, []);

    return (
        <Container>
            <canvas id="myCanvas" ref={canvasRef}>
            </canvas>
            <Box sx={{ m: '0.5rem' }}>
            <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={20}
            />
            </Box>
        </Container>
    )
}

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
  
ValueLabelComponent.propTypes = {
children: PropTypes.element.isRequired,
value: PropTypes.number.isRequired,
};

const PrettoSlider = styled(Slider)({
    color: '#1976D2',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
        },
        '&:before': {
        display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#1976D2',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
        transform: 'rotate(45deg)',
        },
    },
});
