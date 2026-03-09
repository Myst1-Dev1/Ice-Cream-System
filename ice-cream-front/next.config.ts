import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  turbopack: {},
};

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default pwa(nextConfig);