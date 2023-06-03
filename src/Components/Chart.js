import "./Chart.css";

import { useRef, useEffect, useState } from "react";
import * as React from "react";
import * as d3 from "d3";

//MUI
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Container, Box, Button, Stack, ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { element } from "prop-types";

export default function Chart(props) {
  const divRef = useRef(null);
  const datadict = useRef(props.data);
  const Xaxis = useRef(null);
  const Yaxis = useRef(null);
  const color = useRef({});
  const change = useRef(false);

  //* update function
  function update(data) {
    var margin = { top: 50, right: 30, bottom: 50, left: 110 },
      width = test.width * 0.8,
      height = test.height * 0.9;

    var temp = data.sort(function (b, a) {
      return a.value - b.value;
    });

    var xmax = d3.max(data, function (d) {
      return d.value;
    });

    var svg = d3.select(divRef.current);
    var u = svg.selectAll("rect").data(temp);

    // X axis
    var x = d3.scaleLinear().domain([0, 10000]).range([0, width]);

    // Y axis
    var y = d3
      .scaleBand()
      .domain(props.data.map((d) => d.group))
      .range([0, height])
      .padding(0.1);

    x.domain([0, xmax]);
    Xaxis.current
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    y.domain(
      data.map(function (d) {
        return d.group;
      })
    );
    Yaxis.current.transition().duration(1000).call(d3.axisLeft(y));

    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("y", function (d) {
        return y(d.group);
      })
      .attr("x", x(0))
      .attr("height", y.bandwidth())
      .attr("width", function (d) {
        if (d.value == NaN) {
          return 0;
        }
        return (width * d.value) / xmax;
      })
      .attr("fill", function (d) {
        return color.current[d.group];
      });

    u.exit().remove();
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
      d3.selectAll("svg").remove();
      test.style.width = "100%";
      test.style.height = "100%";
      test.style.backgroundColor = "white";
      test.style.borderRadius = "10px";
      test.style.boxShadow = "0px 1px 3px -1.5px rgba(0,0,0,0.75)";
      test.style.minHeight = "70vh";
      test.width = test.offsetWidth;
      test.height = test.offsetHeight;

      var margin = { top: 50, right: 30, bottom: 50, left: 110 },
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
      var x = d3.scaleLinear().domain([0, 1000000]).range([0, width]);
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

      var u = svg.selectAll("rect").data(datadict.current);

      u.enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function (d) {
          return y(d.group);
        })
        .attr("width", function (d) {
          return x(d.value);
        })
        .attr("height", y.bandwidth())
        .attr("fill", function (d) {
          return color.current[d.group];
        });

      Update.current(datadict.current);

      change.current = true

    }
    else
    {
        Update.current(props.data)
    }
  }, [props.data]);

  return (
    <Container>
      {/* <canvas id="myCanvas" ref={canvasRef} >
            </canvas> */}
      <div id="test" ref={divRef}></div>
      <Box sx={{ m: "0.5rem" }}>
        <CoolSlider
          valueLabelDisplay="auto"
          defaultValue={0}
          max={Object.keys(props.date).length - 1}
          scale={(value) => props.date[value]}
          onChange={(value) => {
            props.handleSlide(value.target.value);
            props.changeDate(value.target.value);
          }}
        />
      </Box>
      <ButtonRow />
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
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      alignItems="center"
      justifyContent="center"
    >
      <ToggleButton value="playerCount">Player Count</ToggleButton>
      <ToggleButton value="playedTime">Played Time</ToggleButton>
      <ToggleButton value="engagement">Engagement</ToggleButton>
      <ToggleButton value="price">Price</ToggleButton>
    </ToggleButtonGroup>
  );
}
