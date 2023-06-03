import { List, ListItem, Typography, Link, Container } from '@mui/material';
import React from 'react';
import CustomWordCloud from './CustomWordCloud';


export default function FooterCardMenu(props) {

  return (
      <Container>
        <Typography variant="h5" component="h5">
            {props.menu.title}
        </Typography>
        {props.cloud && (
          <CustomWordCloud />
        ) || (
          <List>
            {props.menu.menu.map(i => {
              return (
                <ListItem>
                  <Typography paragraph>
                    <Link 
                      href={i.link}
                      target="_blank"
                    >
                      {i.text}
                    </Link>
                  </Typography>
                </ListItem>
              )
            })}
          </List>
        )}
      </Container>
  );
};