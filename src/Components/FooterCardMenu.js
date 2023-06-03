import { List, ListItem, Typography, Link,  Container } from '@mui/material';
import WordCloud from 'react-d3-cloud';
// https://github.com/Yoctol/react-d3-cloud

let v = 5000;

function rot90() {
  return Math.floor(Math.random() * 2) * 90;
}

export default function FooterCardMenu (props) {
  return (
    <Container>
      <Typography variant="h5" component="h5" fontWeight="bold">
        {props.menu.title}
      </Typography>
        {!props.cloud && (
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
        )}
        {props.cloud && (
          <Container className='footer-cloud-container'>
            <WordCloud
              data={props.menu.menu.map(i => {
                return {text: i.text, value: v}
              })}
              rotate={(word) => rot90()}
              spiral="rectangular"
              onWordClick={(event, d) => {
                window.open(
                  props.menu.menu.find(i => i.text == d.text).link,
                  "_blank"
                );
              }}
            />
            </Container>
        )}
    </Container>
  );
};