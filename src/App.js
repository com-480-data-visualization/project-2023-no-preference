import './App.css';
import Chart from './Components/Chart';
import Instructions from './Components/Instructions';
import CardMUI from './Components/CardMUI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          header
        </h2>  
      </header>
      <main className='App-main'>
        <div className='App-main-row'>
          <Chart />
          <Instructions />
        </div>
        <div className='App-cardRow'>
          <CardMUI title="Player count" />
          <CardMUI title="Play time" />
          <CardMUI title="Engagement" />
        </div>
      </main>
    </div>
  );
}

export default App;
