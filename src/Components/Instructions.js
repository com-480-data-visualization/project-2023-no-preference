import './Instructions.css'
import Slider from '@mui/material/Slider';

export default function Instructions () {
    return (
        <div className="instructions">
            <h1>Instructions</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem.
            </p>
            <h3>Adjust the slider below to change the chart</h3>
            <Slider size="small" defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </div>
    )
}