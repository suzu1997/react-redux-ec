import { Router } from './Router';
import './index.css';
import 'tailwindcss/tailwind.css';
import { Header } from './components/Header/Header';
import { MenuColumn } from './components/Products/MenuColumn';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-24 flex'>
        <div className='hidden md:block md:fixed md:left-8 md:w-60 h-auto'>
          <MenuColumn />
        </div>
        <Router />
      </main>
    </>
  );
};
export default App;
