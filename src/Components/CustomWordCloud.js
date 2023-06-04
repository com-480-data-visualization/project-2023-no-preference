import React from 'react';
import WordCloud from 'react-d3-cloud';
import ReactDOM from 'react-dom';

function rot90() {
    return Math.floor(Math.random() * 2) * 90;
}

class CustomWordCloud extends React.Component {
    
 constructor(props){
    super(props);
 }
 
 componentDidMount(){
    setTimeout(() => {
        const v = 4000;
        // List of words
        const words = [
            {text: "React", value: v, link: "https://react.dev/"},
            {text: "Material UI", value: v, link: "https://mui.com/"},
            {text: "D3.js", value: v, link: "https://d3js.org/"},
            {text: "Steam", value: v, link: "https://store.steampowered.com/"},
            {text: "Kaggle", value: v, link: "https://www.kaggle.com/datasets"}
        ];

        let cloudy = document.getElementById("cloudy");
        ReactDOM.render(
            <WordCloud 
                data={words}
                height={400}
                rotate={(word) => rot90()}
                spiral="rectangular"
                onWordClick={(event, d) => {
                    window.open(
                        d.link,
                        "_blank"
                    );
                }}
            />
        , cloudy);
    }, 2000);
 }
 
 render(){
  return (
    <div id="cloudy">
    </div>
  );
 }
 
}

export default CustomWordCloud;