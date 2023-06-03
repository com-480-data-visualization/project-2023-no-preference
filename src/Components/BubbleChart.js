import React, { useRef, useEffect } from 'react';

//MUI
import { Container, Grid, Stack, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//dataset
import gamesData from '../data/gamesPopularity.json';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function BubbleChart(){
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "white";
    canvas.style.borderRadius = "10px";
    canvas.style.boxShadow = "0px 1px 3px -1.5px rgba(0,0,0,0.75)";
    canvas.style.minHeight = "80vh";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  return (
    <Grid container spacing={2}>
    <Grid item xs={9}>
      <Container>
        <canvas id="myCanvas" ref={canvasRef}>
        </canvas>
      </Container>
    </Grid>
    <Grid item xs={3}>
        <Stack spacing={2}>
            <Paper sx={{ p: 2, height: '100%' }} style={{ width: 313 }}>
                <h3>Clarification</h3>
            </Paper>
            <CheckboxesTags />
        </Stack>
    </Grid>
  </Grid>
  )
}

function CheckboxesTags() {
    const compamyNames = getTeams();

    return (
      <Autocomplete
        multiple
        id="game-company-selector"
        options={compamyNames}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        style={{ width: 345 }}
        renderInput={(params) => (
          <TextField {...params} label="Game Companies" placeholder="Choose one or more" />
        )}
      />
    );
  }

const getTeams = () => {
    // Extract the "Team" values
    const teamValues = gamesData.map((game) => game.Team);

    // Create a Set to store unique individual companies
    const uniqueCompaniesSet = new Set();

    // Iterate over each team value
    teamValues.forEach((team) => {
        // Remove the surrounding square brackets and quotes and split the string into individual companies
        const companiesString = team.slice(2, -2);
        const companies = companiesString.split("', '");
        
        companies.forEach((company) => uniqueCompaniesSet.add(company));
    });
    // Convert the Set back to an array and return a dictionary
    const individualCompanies = Array.from(uniqueCompaniesSet);

    return individualCompanies.map((company) => ({ title: company }));
    //console.log(uniqueTeamsDic);
}