import './App.css';
import Chart from './Components/Chart';
import Instructions from './Components/Instructions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          header
        </h2>  
      </header>
      <main className='App-main'>
        <Chart />
        <Instructions />
      </main>
      <footer className='App-footer'>
        footer
      </footer>
    </div>
  );
}

export default App;
