import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // output: "standalone",


  
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', 
    },
  },

 




};

export default nextConfig;