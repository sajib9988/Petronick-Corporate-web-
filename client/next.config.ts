import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // প্রয়োজন অনুযায়ী adjust করুন
    },
  },
};

export default nextConfig;