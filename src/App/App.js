import '../css/App.css';
import Chart from '../Components/Chart';
import CardMUI from '../Components/CardMUI';
import NavBar from '../Components/NavBar';


// dataset
import topcount from '../data/topcount.json';
import playercount from '../data/playercount.json';
//MUI
import { AppBar, Container, Toolbar, Button, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/joy/Stack';

function dataWithDate() {

}

function App() {
  return (
    <main className='App-main'>
      <NavBar />
      <Box sx={{ m: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Chart />
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