import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';


export default function NavBar() {
    return (
        <AppBar position='sticky' component='div'>
        <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Steaming
            </Typography>
            <Button disableRipple color="inherit" 
                onClick={() => {
                    document.getElementsByTagName('header')[0].className = "show-me";
                    document.getElementsByTagName('main')[0].className = "hide-me";
                    //document.getElementsByTagName('body')[0].style.overflow = "scroll";        
                }}
            >
                Return
            </Button>
        </Toolbar>
        </AppBar> 
    );
}

