import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/bookings`,
      lastModified: new Date(),
    },
  ];
}