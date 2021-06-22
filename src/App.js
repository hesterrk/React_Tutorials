import './App.css';
import { SnackbarProvider } from 'notistack';
import TutorialsList from './components/TutorialsList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to your tutorials</h1>
      </header>
      <SnackbarProvider maxSnack={1} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}> 
        <TutorialsList />
      </SnackbarProvider>
    </div>
  );
}

export default App;
