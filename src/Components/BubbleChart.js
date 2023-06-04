import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ReactDOM from "react-dom";
import './BubbleChart.css';

//MUI
import {
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
//dataset
import gamesData from "../data/gamesPopularity.json";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const chipColors = {};
const colors = [
  "#FF0000",
  "#79aa99",
  "#ece67e",
  "#bf77f6",
  "#ffc0cb",
  "#efc0fe",
  "#ffa180",
  "#fdfdfe",
  "#9ab8c2",
  "#98d98e",
  "#aaffaa",
  "#e3e7c4",
  "#a58d7f",
  "#fdee73",
  "#f1ebda",
  "#efc5b5",
  "#FFD700",
  "#b7dadd",
  "#a2cffe",
  "#dae4ee",
];

export default function BubbleChart() {
  const bubble = useRef(null);
  const bubblechanged = useRef(false);
  const chartsvg = useRef(undefined);
  const [data, setdata] = React.useState(undefined);

  function UpdateChart(value) {
    if (value != undefined) {
      chartsvg.current.selectAll("circle").remove();
      chartsvg.current.selectAll(".tooltip").remove();

      var data = [];
      gamesData.forEach((element) => {
        value[0].forEach((studio) => {
          if (element.Team.includes(studio.title)) {
            var review = element["Number of Reviews"];
            var wish = element["Wishlist"];
            wish =
              typeof wish == "string"
                ? parseFloat(wish.slice(0, -1)) * 1000
                : wish;
            review =
              typeof review == "string"
                ? parseFloat(review.slice(0, -1)) * 1000
                : review;
            data.push({
              "team": studio.title,
              "name": element.Title,
              "rate": element.Rating,
              "review": review,
              "wish": wish,
            });
          }
        });
      });

      var tooltip = d3
        .select(bubble.current)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")
        .style("position", "fixed")
        .style('font-size','10px')
        ;
      
      var showTooltip = function(event, d) {
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .html("Game: " + d.name +
          ' | Rating: '+ d.rate)
          .style("left", (event.x + 10) + "px")
          .style("top", (event.y + 10) + "px")
      }
      var moveTooltip = function(event, d) {
        tooltip
          .style("left", (event.x + 10) + "px")
          .style("top", (event.y + 10) + "px")
      }
      var hideTooltip = function(event, d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }

      var x = d3
        .scaleLinear()
        .domain([0, 6000])
        .range([0, bubble.current.width * 0.8])
      var y = d3
        .scaleLinear()
        .domain([0, 6000])
        .range([bubble.current.height * 0.9, 0]);
      var z = d3.scaleLinear().domain([0, 5000]).range([0, 10]);

      chartsvg.current
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr('class', 'bubble')
        .attr("cx", function (d) {
          return x(d.wish);
        })
        .attr("cy", function (d) {
          return y(d.review);
        })
        .attr("r", function (d) {
          return z(d.rate*1000);
        })
        .style("fill", function (d) {
          return chipColors[d.team];
        })
        .style("opacity", "0.4")
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", showTooltip)
        .on('mousemove', moveTooltip)
        .on('mouseleave', hideTooltip)
    }
  }

  useEffect(() => {
    if (!bubblechanged.current) {
      const chart = bubble.current;
      d3.select(chart).selectAll("svg").remove();
      chart.style.width = "100%";
      chart.style.height = "100%";
      chart.style.borderRadius = "10px";
      chart.style.boxShadow = "0px 1px 3px -1.5px rgba(0,0,0,0.75)";
      chart.style.minHeight = "80vh";
      chart.width = chart.offsetWidth;
      chart.height = chart.offsetHeight;

      var margin = { top: 40, right: 30, bottom: 100, left: 110 },
        width = chart.width * 0.8,
        height = chart.height * 0.9;

      // append the svg object to the body of the page
      var svg = d3
        .select(chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      chartsvg.current = svg;

      svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'translate('+ -55 + ',' + height/3 +')rotate(-90)')
      .text("Number of reviews")
      .style('fill', '#bdc1c5')

      svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'translate('+ width/2 + ',' + (height+70)  +')')
      .text("Wish list")
      .style('fill', '#bdc1c5')

      // X axis
      var x = d3.scaleLinear().domain([0, 6000]).range([0, width]);
      var xaxis = svg.append("g");
      xaxis
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      var y = d3.scaleLinear().domain([0, 6000]).range([height, 0]);
      var yaxis = svg.append("g");
      yaxis
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("text-anchor", "end");

      UpdateChart([[{ title: "Nintendo" }], "debug"]);

      bubblechanged.current = true;
    } else {
      UpdateChart(data);
    }
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Container>
          <div id="bubble" ref={bubble} />
        </Container>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={2} className="leftStack">
          <Card sx={{ minWidth: 245, maxWidth: 345 }} className="App-Card">
            <CardContent>
              <Typography variant="h5" component="div">
                Clarification
              </Typography>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                In the checkbox you select studios, not companies. If you write
                "Nintendo" for example all nintendo studios will be shown.
                Choose just "Nintendo" if you want all the studios to be
                included.
              </Typography>
            </CardContent>
          </Card>
          <CheckboxesTags update={setdata} />
        </Stack>
      </Grid>
    </Grid>
  );
}

function CheckboxesTags(props) {
  const compamyNames = getTeams();

  const getChipColor = (key) => {
    if (!chipColors[key]) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      chipColors[key] = colors[randomIndex];
    }
    return chipColors[key];
  };

  return (
    <Autocomplete
      multiple
      id="game-studio-selector"
      options={compamyNames}
      defaultValue={[compamyNames[3]]}
      limitTags={2}
      onChange={(event, v, reason) => props.update([v, reason])}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            label={option.title}
            style={{ backgroundColor: getChipColor(option.title) }}
            {...getTagProps({ index })}
          />
        ))
      }
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
      style={{
        width: 345,
        backgroundColor: "#1b2838",
        color: "#bdc1c5"
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Studio/s"
          placeholder="Choose one or more"
          sx={{
            backgroundColor: "#1b2838",
            color: "#bdc1c5"
          }}
        />
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
};
