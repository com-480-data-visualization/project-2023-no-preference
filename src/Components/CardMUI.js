import { Avatar, Card, CardContent, CardActionArea, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

export default function CardMUI (props) {
  const title = props.title;
  const rank1_path = '/static/images/rank1.png';
  return (
    <Card sx={{ maxWidth: 345, gap: 2 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <List>
          <ListItem>
                  <ListItemIcon>
                    <Avatar alt="rank 1" title="Rank 1" src={rank1_path} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Single-line item"
                    secondary='Secondary text'
                  />
                </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};