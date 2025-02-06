import { MetadataRoute } from "next";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_BASE_URL_DEV;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/manage", "/dashboard/inventory"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
