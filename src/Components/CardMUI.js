import { Card, CardContent, CardActionArea, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useEffect } from 'react';
import * as React from "react";


export default function CardMUI (props) {
  const title = props.title;
  const [top1, settop1] = React.useState(undefined);
  const [top2, settop2] = React.useState(undefined);
  const [top3, settop3] = React.useState(undefined);


  useEffect(()=>{
    if (props.data != undefined)
    {
      settop1(props.data[0])
      settop2(props.data[1])
      settop3(props.data[2])
    }
  }, [props.data])

  return (
    <Card sx={{ maxWidth: 345, gap: 2, borderRadius: 2 }} className='App-Card'>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
          style={{
            display:'flex',
            alignContent:'center',
            justifyContent:'center'
          }}>
            {title}
          </Typography>
          <Divider/>
          <List>
            <ListItem>
              <ListItemIcon>
                <img className="card-rank-icon" alt="rank 1 icon" src={process.env.PUBLIC_URL + "/images/rank1.png"} />
              </ListItemIcon>
              <ListItemText
                primary={top1 !== undefined ? top1.id : 'loading'}
                secondary={top1 !== undefined ? top1.player+' players' : 'loading'}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <img className="card-rank-icon" alt="rank 2 icon" src={process.env.PUBLIC_URL + "/images/rank2.png"} />
              </ListItemIcon>
              <ListItemText
                primary={top2 !== undefined ? top2.id : 'loading'}
                secondary={top2 !== undefined ? top2.player+' players' : 'loading'}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <img className="card-rank-icon" alt="rank 3 icon" src={process.env.PUBLIC_URL + "/images/rank3.png"} />
              </ListItemIcon>
              <ListItemText
                primary={top3 !== undefined ? top3.id : 'loading'}
                secondary={top3 !== undefined ? top3.player+' players' : 'loading'}
              />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};