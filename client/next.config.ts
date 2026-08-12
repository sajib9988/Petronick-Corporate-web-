import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // output: "standalone",


  
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', 
    },
  },
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
},
 




};

export default nextConfig;