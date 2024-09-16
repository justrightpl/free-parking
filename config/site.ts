// Helper function to get the current domain
function getCurrentDomain(): string {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  return process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost';
}

export interface SiteConfig {
  domain: string;
  useDynamicDomain: boolean;
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

interface SiteConfigInternal extends SiteConfig {
  _domain: string;
}

export const siteConfig: SiteConfigInternal = {
  domain: "example.com",
  useDynamicDomain: false,
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
  _domain: "example.com", // Initialize the internal domain property
};

// Function to get the effective domain
export function getEffectiveDomain(): string {
  return siteConfig.useDynamicDomain ? getCurrentDomain() : siteConfig.domain;
}

// Override the domain property with a getter and setter
Object.defineProperty(siteConfig, 'domain', {
  get: function(this: SiteConfigInternal) {
    return this.useDynamicDomain ? getCurrentDomain() : this._domain;
  },
  set: function(this: SiteConfigInternal, value: string) {
    this._domain = value;
  },
  enumerable: true,
  configurable: true
});
