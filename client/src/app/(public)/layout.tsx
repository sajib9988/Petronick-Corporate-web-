
import Footer from '@/components/home-components/footer';
import Navbar from '@/components/home-components/navbar/navbar';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (

    // ata ager style chilo
    // <div className='bg-sky-100 '>
    //   <Navbar/>
    //   {children}
    //   <Footer />
    // </div>

    // ata notun style
 <div className="relative min-h-screen">
      {/* 🔵 Full Website Background Gradient - sobar pisoney */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-sky-100 via-blue-50 to-white" />
      
      {/* Content */}
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>




  );
}