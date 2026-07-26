
import Footer from '@/components/home-components/footer';
import Navbar from '@/components/home-components/navbar/navbar';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (

    
    <div className='bg-[#4dd0e1] '>
      <Navbar/>
      {children}
      <Footer />
    </div>





  );
}