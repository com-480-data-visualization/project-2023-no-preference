import '../css/App.css';
import Chart from '../Components/Chart';
import CardMUI from '../Components/CardMUI';
import NavBar from '../Components/NavBar';
import * as d3 from "d3";
import React, {useState} from "react";


// dataset
import topcount from '../data/topcount.json';
import playercount from '../data/playercount.json';
//MUI
import { AppBar, Container, Toolbar, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/joy/Stack';


function dataWithDate(data) {

}

function handleSlide(value){
  console.log(Object.getOwnPropertyNames(topcount).length)
  console.log(topcount.Action)
}


function App() {
  handleSlide(1)

  return (
    <main className='App-main'>
      <NavBar />
      <Box sx={{ m: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Chart handleSlide={handleSlide}/>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={2}>
              <CardMUI title="Player count"/>
              <CardMUI title="Play time"/>
            </Stack>
          </Grid>
        </Grid> 
      </Box>
    </main>
  );
}


export default App;