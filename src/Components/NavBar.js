import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';


function returnButton() {
    document.getElementsByTagName('header')[0].scrollIntoView();
    document.getElementsByTagName('header')[0].className = "show-me";
    ["main", "footer"].forEach(e => {
      document.getElementsByTagName(e)[0].classList.add("show-me");
      document.getElementsByTagName(e)[0].classList.remove("hide-me");
    });
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
}

async function credits() {
    // +1000000 social credits GG
    document.getElementsByTagName('footer')[0].scrollIntoView({behavior:'smooth'});
  }


export default function NavBar() {
    return (
        <AppBar position='sticky' component='div' className='App-NavBar'>
        <Toolbar variant="dense">
            <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }} className='logo-inline'>
                Steaming
            </Typography>
            <Button color="inherit" onClick={credits}>
                Credits
            </Button>
            <Button color="inherit" onClick={returnButton}>
                Menu
            </Button>
        </Toolbar>
        </AppBar> 
    );
}

