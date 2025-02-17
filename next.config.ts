import { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import defaultCache from "@/cache";
const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  register: true, //true
  cacheStartUrl: true,
  extendDefaultRuntimeCaching: true,
  disable: isDev,
  fallbacks: {
    document: "/fallback",
  },
  workboxOptions: {
    runtimeCaching: [...defaultCache],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WEATHER_URL: process.env.WEATHER_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        pathname: "/**",
      },
    ],
  },
};

export default withPWA({
  ...nextConfig,
});
