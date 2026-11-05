import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/news/olas-flywheel", destination: "/news/blos-flywheel", permanent: true },
      { source: "/news/zelous-flywheel", destination: "/news/blos-flywheel", permanent: true },
    ];
  },
};

export default nextConfig;
