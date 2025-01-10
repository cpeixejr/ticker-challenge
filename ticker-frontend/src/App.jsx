import { Provider } from 'react-redux';
import './App.css'
import store from './store/store';
import Parent from './components/Parent';

function App() {
  return (
    <>
      <Provider store={store}>
        <Parent />
      </Provider>
    </>
  )
}

export default App
