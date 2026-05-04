const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        hostname: 'images.unsplash.com'
      },
    ],
  },
};

export default nextConfig;