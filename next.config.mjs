/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // The public site is a website, not an app: sign-in and logged-in app routes send visitors home.
  // Remove these redirects to bring the app back.
  async redirects() {
    return ["/auth/:path*", "/dashboard", "/onboarding", "/community", "/admin"].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;