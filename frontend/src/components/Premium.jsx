import { Card, Button } from "./UI"; 
import Layout from "../components/Layout";

const premiumFeatures = [
  { title: "Travel Vouchers", description: "Get exclusive travel discounts for alumni events." },
  { title: "Coupons & Deals", description: "Access to premium coupons and special offers." },
  { title: "Exclusive Webinars", description: "Attend webinars hosted by top industry experts." },
  { title: "Networking Events", description: "Connect with alumni across the globe." },
  { title: "Career Guidance", description: "Mentorship and career advice from experienced alumni." },
  { title: "Workshops & Training", description: "Participate in skill-building sessions and workshops." },
];

export default function Premium() {
  return (
    <Layout>
      <div className="p-6 min-h-screen bg-[#0F111A] flex justify-center">
        <Card className="p-8 shadow-md rounded-lg bg-[#1A1F3B] w-full max-w-5xl space-y-6">
          <h2 className="font-bold text-3xl text-[#6E7691] mb-4">
            🌟 Premium Membership
          </h2>
          <p className="text-[#91896E] text-lg mb-6">
            Unlock premium benefits and gain exclusive access to events, webinars, discounts, and networking opportunities with alumni.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#2A2F4A] border border-[#3B82F6] hover:bg-[#3B82F6] transition duration-300"
              >
                <h3 className="font-semibold text-[#E2E8F0] mb-1">{feature.title}</h3>
                <p className="text-[#D1D5DB] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button className="px-6 py-3 bg-[#3B82F6] text-white hover:bg-[#2563EB] rounded-lg font-medium">
              Upgrade Now
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
