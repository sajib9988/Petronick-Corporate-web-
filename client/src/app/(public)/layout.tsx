
import Footer from '@/components/home-components/footer';
import Navbar from '@/components/home-components/navbar/navbar';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (

    
    <div className='bg-sky-100 '>
      <Navbar/>
      {children}
      <Footer />
    </div>





  );
}