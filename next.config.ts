import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jottossonportfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
