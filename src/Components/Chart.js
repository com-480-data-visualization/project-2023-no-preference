import "./Chart.css";

import { useRef, useEffect } from "react";
import * as React from "react";
import * as d3 from "d3";
import ReactDOM from 'react-dom';

//MUI
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Container, Box, ToggleButton, Typography } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import topcount from "../data/topcount.json";
import gameinfo from "../data/gameinfo.json";
import gamepop from "../data/gamesPopularity.json";



const TRANS_TIME = 150;
const BAR_CHART_ID = "test";
const POPUP_ID = "poppy";


export default function Chart(props) {
  const divRef = useRef(null);
  const datadict = useRef(props.data);
  const Xaxis = useRef(null);
  const Yaxis = useRef(null);
  const color = useRef({});
  const change = useRef(false);
  const chart = useRef(undefined);

  //* update function
  function update(data) {
    var margin = { top: 30, right: 30, bottom: 50, left: 110 },
      width = test.width * 0.8,
      height = test.height * 0.9;

    var temp = data.sort(function (b, a) {
      return a.value - b.value;
    });

    var xmax = Math.ceil(temp[0].value);
    var maxrange = xmax.toString().length + 1;

    var svg = chart.current;
    
    // X axis
    var x = d3.scaleLog()
      .domain([10, 10 ** maxrange])
      .range([0, width])
      .base(10);
      
    Xaxis.current
      .transition()
      .duration(TRANS_TIME)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


    // Y axis
    var y = d3
      .scaleBand()
      .domain(props.data.map((d) => d.group))
      .range([0, height])
      .padding(0.1)
      .domain(
        data.map(function (d) {
          return d.group;
        })
      );
    Yaxis.current
      .transition()
      .duration(TRANS_TIME)
      .call(d3.axisLeft(y));

    // rectangles
    var u = svg.selectAll("rect").data(temp);
    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(TRANS_TIME)
      .attr("y", function (d) {
        return y(d.group);
      })
      .attr("x", x(0))
      .attr("height", y.bandwidth())
      .attr("width", function (d) {
        return x(d.value)
      })
      .attr("fill", function (d) {
        return color.current[d.group];
      })
      .attr("id", (d) => {
        return Math.round(y(d.group));
      });

      
      u.on("click", (e, d) => {
        let root = document.getElementById("root");
        let mouseX = d3.pointer(e, root)[0];
        let mouseY = d3.pointer(e, root)[1];
        let poppy = document.getElementById("poppy");
        poppy.style.left = mouseX+"px";
        poppy.style.top = mouseY+"px";
        poppy.style.display = "block";
        var date = document.getElementById("slider-value").textContent;
        var i = 0;
        while (topcount["Time"][i] != date) {
          i += 1;
        }
        let app_id = topcount[d.group + "_id"][i];
        let app_name = gameinfo["name"][app_id];
        let app_desc = gamepop.filter(e => e["Title"] == app_name);
        console.log(app_desc);

        poppy.innerHTML = "<h3>"+app_name+"</h3>"+
        "<p>"+app_desc+"</p>";
        
      });

      u.exit().remove()
  }

  const Update = React.useRef(update);
    
  //* Effect hook
  useEffect(() => {
    if (!change.current) {
        Object.keys(props.data).forEach(
            (element) =>
            (color.current[props.data[element].group] =
                "hsl(" + Math.random() * 360 + ",90%,75%)")
                );
                
                const test = divRef.current;
      d3.select(test).selectAll("svg").remove();
      test.style.width = "100%";
      test.style.height = "100%";
      test.style.backgroundColor = "white";
      test.style.borderRadius = "10px";
      test.style.boxShadow = "0px 1px 3px -1.5px rgba(0,0,0,0.75)";
      test.style.minHeight = "70vh";
      test.width = test.offsetWidth;
      test.height = test.offsetHeight;

      var margin = { top: 30, right: 30, bottom: 50, left: 110 },
        width = test.width * 0.8,
        height = test.height * 0.9;

      // append the svg object to the body of the page
      var svg = d3
        .select(test)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    

      // X axis
      var x = d3.scaleLog().domain([10, 100]).range([0, width]).base(10);
      var xaxis = svg.append("g");
      xaxis
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
      Xaxis.current = xaxis;

      // Y axis
      var y = d3
        .scaleBand()
        .domain(datadict.current.map((d) => d.group))
        .range([0, height])
        .padding(0.1);
      var yaxis = svg.append("g").call(d3.axisLeft(y));

      Yaxis.current = yaxis;

      chart.current = svg

      var u = svg.selectAll("rect").data(datadict.current);

      u
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function (d) {
          return y(d.group);
        })
        .attr("width", function (d) {
          return width;
        })
        .attr("height", y.bandwidth())
        .attr("fill", function (d) {
          return color.current[d.group];
        });

      Update.current(datadict.current);

      change.current = true;
    } else {
      Update.current(props.data);
    }
  }, [props.data]);

  return (
    <Container>
      <div id={BAR_CHART_ID} ref={divRef}>
        <span id="title">Player count by categories</span>
      </div>
      <div id={POPUP_ID}></div>
      <Box sx={{ m: "0.5rem" }}>
        <CoolSlider
          valueLabelDisplay="off"
          defaultValue={0}
          max={Object.keys(props.date).length - 1}
          scale={(value) => props.date[value]}
          onChange={(value) => {
            props.handleSlide(value.target.value);
            props.changeDate(value.target.value);
            document.getElementById("slider-value").textContent = props.date[value.target.value];
          }}
        />
            </Box>
            
        <div style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
      <span id="slider-value">{props.date[0]}</span>
        </div>
    </Container>
  );
}

/**
 * Get the value with the onChange function and do something with it
 * https://mui.com/material-ui/api/slider/
 */
const CoolSlider = styled(Slider)({
  color: "#1976D2",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#1976D2",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

/**
 * The row with the four buttons
 * @todo: Make the buttons show the different charts
 */
function ButtonRow() {
  const [alignment, setAlignment] = React.useState("playerCount");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container className="chart-buttons-container">
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      alignItems="center"
      justifyContent="center"
      flexItem
    >
      {/* <ToggleButton value="playerCount">Player Count</ToggleButton> */}
      {/* <ToggleButton value="playedTime">Player Gain</ToggleButton> */}
      {/* <ToggleButton value="engagement">Online Percentage</ToggleButton> */}
      {/* <ToggleButton value="price">Price</ToggleButton> */}
    </ToggleButtonGroup>
      <Typography flexItem>
        <span id="slider-value">14-12-2017</span>
      </Typography>
    </Container>
  );
}
