import { Router } from './Router';
import './index.css';
import 'tailwindcss/tailwind.css';
import { Header } from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-24'>
        <Router />
      </main>
    </>
  );
};
export default App;
