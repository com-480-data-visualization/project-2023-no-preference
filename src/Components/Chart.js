import './Chart.css';

import Slider from '@mui/material/Slider';

export default function Chart() {
    return (
        <div className="chart">
            <canvas id="myChart">
            </canvas>
            <div className="chart-slider">
                <Slider size="small" defaultValue={50} aria-label="Default" valueLabelDisplay="auto"/>
            </div>
        </div>
    )
}