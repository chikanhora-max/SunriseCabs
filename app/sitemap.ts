import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://sunrise-cabs.vercel.app"; return ["/","/studio","/reviews","/tools","/contact"].map(path => ({ url: `${base}${path}`, lastModified: new Date() })); }
