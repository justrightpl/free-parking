"use client"
import { ParkedDomainWithOfferField }  from "@/components/parked-domain-with-offer-field"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <ParkedDomainWithOfferField config={siteConfig} />
    </div>
  );
}
