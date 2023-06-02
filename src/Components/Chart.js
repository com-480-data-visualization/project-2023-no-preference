import './Chart.css';

import Slider from '@mui/material/Slider';
//MUI
import { Container, Box } from '@mui/material';

export default function Chart() {
    return (
        <Container>
            <canvas id="myChart" className='canvas'>
            </canvas>
            <Slider size="small" defaultValue={0} aria-label="Default" valueLabelDisplay="auto"/>
        </Container>
    )
}