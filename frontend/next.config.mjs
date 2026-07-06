const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/proxy-backend/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
  },
};

export default nextConfig;
