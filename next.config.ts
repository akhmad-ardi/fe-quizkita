import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://47.129.31.85:4000/:path*", // backend Express di EC2
      },
    ];
  },
};

export default nextConfig;
