export interface SiteConfig {
  domain: string;
  title: string;
  description: string;
  listPrice: number;
  currency: string;
  currencySymbol: string;
  contactEmail: string;
  metaDescription: string;
  ogImage: string;
  links: {
    name: string;
    url: string;
  }[];
  githubRepo: {
    name: string;
    url: string;
  };
  isSubmitOfferEnabled: boolean;
}

export const siteConfig: SiteConfig = {
  domain: "example.com",
  title: "Premium Domain for Sale",
  description: "This domain is available for purchase",
  listPrice: 1000,
  currency: "USD",
  currencySymbol: "$",
  contactEmail: "sales@example.com",
  metaDescription: "Secure this domain today and start building your online presence.",
  ogImage: "https://example.com/og-image.jpg",
  links: [
    { name: "Search", url: "https://www.google.com" },
    { name: "News", url: "https://news.ycombinator.com" },
    { name: "Social", url: "https://www.twitter.com" },
    { name: "Shop", url: "https://www.amazon.com" },
  ],
  githubRepo: {
    name: "free-parking",
    url: "https://github.com/justrightpl/free-parking",
  },
  isSubmitOfferEnabled: true,
};
