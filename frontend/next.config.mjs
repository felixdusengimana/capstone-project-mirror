import createNextIntlPlugin from "next-intl/plugin";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

export default withNextIntl(nextConfig);
