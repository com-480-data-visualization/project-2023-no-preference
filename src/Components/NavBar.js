import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';


function returnButton() {
    document.getElementsByTagName('header')[0].className = "show-me";
    ["main", "footer"].forEach(e => {
      document.getElementsByTagName(e)[0].classList.add("show-me");
      document.getElementsByTagName(e)[0].classList.remove("hide-me");
    });
    document.getElementsByTagName('body')[0].style.overflow = "hidden";        
}


export default function NavBar() {
    return (
        <AppBar position='sticky' component='div'>
        <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Steaming
            </Typography>
            <Button disableRipple color="inherit" onClick={returnButton}>
                Return
            </Button>
        </Toolbar>
        </AppBar> 
    );
}

