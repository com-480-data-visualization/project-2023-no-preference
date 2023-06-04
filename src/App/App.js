import '../css/App.css';
import Chart from '../Components/Chart';
import CardMUI from '../Components/CardMUI';
import NavBar from '../Components/NavBar';
import React from "react";

//MUI
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack'; //
import BubbleChart from '../Components/BubbleChart';
import "../css/App.css";

// dataset
import topcount from "../data/topcount.json";
import playercount from "../data/playercount.json";
import gameinfo from "../data/gameinfo.json";
import gameStats from "../data/gameStats.json";
import { element } from 'prop-types';


function handleSlide(value) {
  var result = [];
  Object.keys(playercount).forEach((key) => {
    if (key != "Time") {
      var temp = {};
      temp["group"] = key;
      temp["value"] = playercount[key][value] != null ? playercount[key][value] : 0;
      if (temp.value != 0)
      {
        result.push(temp);
      }
    }
  });
  return result;
}

function changetopcount(value) {
  var result = [];
  var duplicate = [];
  Object.keys(topcount).forEach((element) => {
    if (element != "Time" && !element.includes("_id")) {
      if (!duplicate.includes(topcount[element + "_id"][value])) {
        var temp = {};
        temp["id"] = topcount[element + "_id"][value];
        temp["player"] = topcount[element][value];
        result.push(temp);
        duplicate.push(topcount[element + "_id"][value]);
      }
    }
  });
  result = result.sort(function (b, a) {
    return a.player - b.player;
  });

  result = result.slice(0, 3);
  result.forEach((dict) => {
    dict["id"] = gameinfo["name"][dict["id"]];
  });
  return result;
}

function changegain(value) {
  var temp = playercount.Time[value].split('-')
  var found = gameStats.find(element=> (element['year'] == temp[2] && element['month'] == temp[1]))
  if (found != undefined)
  {
    return [
      {'id':found['gain1_id'], 'player':Math.round(found['gain1'])},
      {'id':found['gain2_id'], 'player':Math.round(found['gain2'])},
      {'id':found['gain3_id'], 'player':Math.round(found['gain3'])}
    ]
  }
  else{
    return undefined
  }

}

function App() {
  const [data, setdata] = React.useState(handleSlide(0));
  const [topplayer, setcount] = React.useState(changetopcount(0));
  const [playergain, setgain] = React.useState(changegain(0));

  return (
    <main className="App-main">
      <NavBar />
      <Box sx={{ m: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Chart
              handleSlide={handleSlide}
              date={playercount.Time}
              changeDate={(value) => {
                setdata(handleSlide(value));
                setcount(changetopcount(value));
                setgain(changegain(value));
              }}
              data={data}
            />
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={2}>
              <CardMUI title="Most played games" data={topplayer}/>
              <CardMUI title="Player gained (monthly)" data={playergain} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ m: "1rem", mt: 10 }}>
        <BubbleChart />
      </Box>
    </main>
  );
}

export default App;
