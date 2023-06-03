import { Typography, Container, Divider } from '@mui/material';
import FooterCardDisplay from '../Components/FooterCardDisplay';
import FooterCardMenu from '../Components/FooterCardMenu'; 
import '../css/Footer.css';
import React from 'react';


let footerMenu1 = {
  title: "Tech. stack and sources:",
  menu: [
    {text: "React", link: "https://react.dev/"},
    {text: "Material UI", link: "https://mui.com/"},
    {text: "D3.js", link: "https://d3js.org/"},
    {text: "Steam", link: "https://store.steampowered.com/"},
    {text: "Kaggle", link: "https://www.kaggle.com/datasets"}
  ]
}

let footerMenu2 = {
  title: "Other links:",
  menu: [
    {text: "Process Book", link: "https://en.wikipedia.org/wiki/Data_and_information_visualization"},
    {text: "Screencast", link: "https://www.youtube.com/watch?v=o-YBDTqX_ZU"}
  ]
}

function Footer() {
  return (
    <footer>
      <Container className="footer-row">
        <FooterCardDisplay flexItem />
        <Divider orientation="vertical" flexItem light />
        <FooterCardMenu flexItem menu={footerMenu1} cloud />
        <Divider orientation="vertical" flexItem />
        <FooterCardMenu flexItem menu={footerMenu2} />
      </Container>
      <Container className="footer-bottom" disableGutters>
        <Typography>
          Steaming, a project made by team "no preference": Jack Lau, Luis Busta, Ulysse Widmer &ensp;-&ensp; COM-480: Data visualization, EPFL, Spring 2023
        </Typography>
      </Container>
      </footer>
  );
}

export default Footer;
