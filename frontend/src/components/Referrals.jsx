import { Card, Button } from "./UI"; 
import Layout from "../components/Layout";

const jobs = [
  { role: "Software Engineer", company: "Microsoft", sharedBy: "Rahul (2016)" },
  { role: "Data Analyst", company: "Google", sharedBy: "Sneha (2019)" },
  { role: "Product Manager", company: "Amazon", sharedBy: "Neha (2020)" },
  { role: "UI/UX Designer", company: "Adobe", sharedBy: "Priya (2018)" },
];

export default function Referrals() {
  return (
    <Layout>
      <div className="p-6 min-h-screen bg-[#0F111A] flex justify-center">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-3xl font-bold mb-4 text-[#6E7691] text-center">
            💼 Alumni Referrals
          </h1>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <Card key={i} className="p-4 shadow">
                <h2 className="font-bold text-[#91896E]">
                  {job.role} @ {job.company}
                </h2>
                <p className="text-sm text-[#C0C5D0]">Shared by: {job.sharedBy}</p>
                <Button className="mt-2 bg-indigo-600 hover:bg-indigo-700">
                  Apply via Referral
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
