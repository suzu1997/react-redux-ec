import { Router } from './Router';
import './index.css';
import 'tailwindcss/tailwind.css';
import { Header } from './components/Header/Header';
import { MenuColumn } from './components/Products/MenuColumn';
import { Footer } from './components/Footer/Footer';
import banner from './assets/img/banner.jpg';

const App = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='py-24 flex flex-1'>
        <div className='hidden lg:block lg:w-60 ml-2'>
          <MenuColumn />
        </div>
        <Router />
        <div className='hidden lg:block lg:w-60 -mt-60'>
          <img src={banner} alt='バナー' className='w-20 mx-auto' />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default App;
