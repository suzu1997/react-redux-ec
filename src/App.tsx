import { Router } from './Router';
import './index.css';
import 'tailwindcss/tailwind.css';
import { Header } from './components/Header/Header';
import { MenuColumn } from './components/Products/MenuColumn';
import { Footer } from './components/Footer/Footer';

const App = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='py-24 flex flex-1'>
        <div className='hidden lg:block lg:w-60 ml-2'>
          <MenuColumn />
        </div>
        <Router />
        <div className='lg:w-60'/>
      </main>
      <Footer />
    </div>
  );
};
export default App;
