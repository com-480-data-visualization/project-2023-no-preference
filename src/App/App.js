import '../css/App.css';
import Chart from '../Components/Chart';
import CardMUI from '../Components/CardMUI';
import NavBar from '../Components/NavBar';
import React from "react";


// dataset
import playercount from '../data/playercount.json';
//MUI
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/joy/Stack';
import BubbleChart from '../Components/BubbleChart';


function handleSlide(value){
  var result = []
  Object.keys(playercount).forEach( key =>
    {
      if (key != "Time"){
        var temp = {}
        temp["group"] = key
        temp["value"] = (playercount[key][value] != null) ? playercount[key][value] : 0
        result.push(temp)
      }
    }
  )
  return result
}


function App() {
  const [date, setdate] = React.useState(0)
  const [data, setdata] = React.useState(handleSlide(0))

  return (
    <main className='App-main'>
      <NavBar />
      <Box sx={{ m: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Chart handleSlide={handleSlide} date={playercount.Time} changeDate={(value)=>setdata(handleSlide(value))} data={data}/>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={2}>
              <CardMUI title="Player count"/>
              <CardMUI title="Play time"/>
            </Stack>
          </Grid>
        </Grid> 
      </Box>
      <Box sx={{ m: '1rem', mt:10}}>
        <BubbleChart />
      </Box>
    </main>
  );
}


export default App;