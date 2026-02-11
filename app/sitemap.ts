import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://evstartpakket.nl' // Replace with your domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/elektrisch-laden`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
        url: `${baseUrl}/elektrisch-laden/kosten-en-besparingen`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
    },
    {
        url: `${baseUrl}/elektrisch-laden/ere-uitleg`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    },
    {
        url: `${baseUrl}/elektrisch-laden/snelladen-en-vakantie`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: `${baseUrl}/elektrisch-laden/thuis-laden`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
  ]
}