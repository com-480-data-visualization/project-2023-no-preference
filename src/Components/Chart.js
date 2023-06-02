import './Chart.css';

import { useRef, useEffect, useState } from 'react';
import * as React from 'react';

//MUI
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { Container, Box, Button, Stack, ToggleButton } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Chart() {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.backgroundColor = "white";
      canvas.style.borderRadius = "10px";
      canvas.style.boxShadow = "0px 1px 3px -1.5px rgba(0,0,0,0.75)";
      canvas.style.minHeight = "70vh";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }, []);

    return (
        <Container>
            <canvas id="myCanvas" ref={canvasRef}>
            </canvas>
            <Box sx={{ m: '0.5rem' }}>
                <CoolSlider
                    valueLabelDisplay="auto"
                    defaultValue={0}
                    onChange={(event) => {}}
                />
            </Box>
            <ButtonRow />
        </Container>
    )
}

/**
 * Get the value with the onChange function and do something with it
 * https://mui.com/material-ui/api/slider/
 */
const CoolSlider = styled(Slider)({
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

/**
 * The row with the four buttons
 * @todo: Make the buttons show the different charts
 */
function ButtonRow() {
    const [alignment, setAlignment] = React.useState('playerCount');
  
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    return (

        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            alignItems="center"
            justifyContent="center"
        >
            <ToggleButton value="playerCount">Player Count</ToggleButton>
            <ToggleButton value="playedTime">Played Time</ToggleButton>
            <ToggleButton value="engagement">Engagement</ToggleButton>
            <ToggleButton value="price">Price</ToggleButton>
        </ToggleButtonGroup>

    );
  }