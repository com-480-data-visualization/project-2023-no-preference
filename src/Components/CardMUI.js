import { Card, CardContent, CardActionArea, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

export default function CardMUI (props) {
  const title = props.title;
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
                <img className="card-rank-icon" alt="rank 1 icon" src={process.env.PUBLIC_URL + "/images/rank1.png"} />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
                secondary='Secondary text'
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img className="card-rank-icon" alt="rank 2 icon" src={process.env.PUBLIC_URL + "/images/rank2.png"} />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
                secondary='Secondary text'
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img className="card-rank-icon" alt="rank 3 icon" src={process.env.PUBLIC_URL + "/images/rank3.png"} />
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