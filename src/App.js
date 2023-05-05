import './App.css';
import Instructions from './Components/Instructions';
import CardMUI from './Components/CardMUI';

// dataset
import topcount from './data/topcount.json'
import playercount from './data/playercount.json'

function App() {
  return (
    //! test the dataset
    // console.log(topcount)
    <div className="App">
      <header className="App-header">
        <h2>
          header
        </h2>  
      </header>
      <main className='App-main'>
        <div className='App-main-row'>
          <div>
            <img className='chart-demo-image' alt="chart demo" src={process.env.PUBLIC_URL + "/images/main-graph-demo1.png"} />
            <div className='App-cardRow'>
              <CardMUI title="Player count" />
              <CardMUI title="Play time" />
              <CardMUI title="Engagement" />
            </div>
          </div>
          <Instructions />
        </div>
      </main>
    </div>
  );
}

export default App;
