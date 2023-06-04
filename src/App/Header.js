import '../css/Header.css';
import { Button, List, ListItem, Typography } from '@mui/material';

function newGame() {
  document.getElementsByTagName('header')[0].className = "hide-me";
  ["main", "footer"].forEach(e => {
    document.getElementsByTagName(e)[0].classList.add("show-me");
    document.getElementsByTagName(e)[0].classList.remove("hide-me");
  });
  document.getElementsByTagName('body')[0].style.overflow = "scroll";
  document.getElementsByTagName('body')[0].style.overflowX = "hidden";
}

async function credits() {
  // +1000000 social credits GG, XD
  newGame();
  await new Promise(r => setTimeout(r, 500));
  document.getElementsByTagName('footer')[0].scrollIntoView({behavior:'smooth'});
}

const menuItems = [
  {name: 'Start', fun: newGame}, 
  {name: 'Options', fun: null},
  {name: 'Process Book', fun: null},
  {name: 'Credits', fun: credits}
]

function Header() {
  document.getElementsByTagName('body')[0].style.overflow = "hidden";
  return (
    <header>
      <Typography component='h1' variant='h1' align='center'>
        STEAMING
      </Typography>
      <Typography paragraph align='center' className='header-subtitle'>
        a project about Steam public data by team <span className='header-team-name'>no preference</span>
      </Typography>
      <List className='header-menu' dense>
        {menuItems.map(item => {
          return (
            <ListItem>
              <Typography component='h2' variant='h2' align='center'>
                <Button disableRipple onClick={item.fun}>
                  {item.name == "Options" && (
                    <a href="https://www.youtube.com/watch?v=o-YBDTqX_ZU" target="_blank">Options</a>
                  ) || item.name == "Process Book" && (
                    <a href="https://github.com/com-480-data-visualization/project-2023-no-preference/blob/website/process_book.pdf" target="_blank">Process Book</a>
                  ) || item.name}
                </Button>
              </Typography>
            </ListItem>
          )
        })}
      </List>
    </header>
  );
}

export default Header;
