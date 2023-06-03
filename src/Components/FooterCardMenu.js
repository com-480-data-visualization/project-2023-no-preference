import { List, ListItem, Typography, Link,  Container } from '@mui/material';

export default function FooterCardMenu (props) {
  return (
    <Container>
      <Typography variant="h5" component="h5" fontWeight="bold">
        {props.menu.title}
      </Typography>
      <Typography paragraph>
        <List>
          {props.menu.menu.map(i => {
            return (
              <ListItem>
                <Link 
                  href={i.link}
                  target="_blank"
                >
                  {i.text}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Typography>
    </Container>
  );
};