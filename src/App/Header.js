import '../css/Header.css';
import { Button, List, ListItem, Typography } from '@mui/material';

function newGame() {
  document.getElementsByTagName('header')[0].className = "hide-me";
  ["main", "footer"].forEach(e => {
    document.getElementsByTagName(e)[0].classList.add("show-me");
    document.getElementsByTagName(e)[0].classList.remove("hide-me");
  });
  document.getElementsByTagName('body')[0].style.overflow = "scroll";  
}

const menuItems = [
  {name: 'Start', fun: newGame}, 
  {name: 'Options', fun: null},
  {name: 'Process Book', fun: null},
  {name: 'Credits', fun: null}
]

function Header() {
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
                  {item.name}
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
