
import Navbar from '@/components/home-components/navbar/navbar';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className=''>
      <Navbar/>
      {children}
      {/* <Footer /> */}
    </div>
  );
}