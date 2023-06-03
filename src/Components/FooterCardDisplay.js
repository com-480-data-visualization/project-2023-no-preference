import { Container, Typography, List, ListItem, Link } from '@mui/material';

export default function FooterCardDisplay (props) {
  return (
    <Container>
      <Typography variant="h6" component="h6" className='logo-inline'>
          Steaming
      </Typography>
      <Typography paragraph>
        a project about Steam public data by team 
        <br />
        <span className='header-team-name'>no preference</span>
        <br />
        <List>
          {["Jack Lau", "Luis Busta", "Ulysse Widmer"].map(n => {
            return (
              <ListItem>
                <Link 
                  href={"https://search.epfl.ch/?filter=people&q="+n}
                  color="inherit"
                  rel="noreferrer"
                  target="_blank"
                  underline='hover'
                >
                  {n}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Typography>
    </Container>
  );
};