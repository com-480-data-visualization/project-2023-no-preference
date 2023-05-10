import '../css/Header.css';
import { Button, List, ListItem, Typography } from '@mui/material';

function newGame() {
  document.getElementsByTagName('header')[0].className = "hide-me";
}

function Header() {
  return (
    <header>
      <Typography component='h1' variant='h1' align='center'>
        STEAMING
      </Typography>
      <Typography paragraph align='center'>
        a project about Steam public data by <span className='header-team-name'>no preference</span>
      </Typography>
      <List className='header-menu' dense>
        <ListItem>
          <Typography component='h2' variant='h2' align='center'>
            <Button disableRipple onClick={newGame}>
              New Game
            </Button>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography component='h2' variant='h2' align='center'>
            <Button disableRipple>
              Options
            </Button>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography component='h2' variant='h2' align='center'>
            <Button disableRipple>
              Process book
            </Button>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography component='h2' variant='h2' align='center'>
            <Button disableRipple>
              Credits
            </Button>
          </Typography>
        </ListItem>
      </List>
    </header>
  );
}

export default Header;
