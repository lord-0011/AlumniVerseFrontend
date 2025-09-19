import { Card, Button } from "./UI"; 
import Layout from "../components/Layout";

export default function Donations() {
  return (
    <Layout>
      <div className="p-6 min-h-screen bg-[#0F111A] flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold mb-4 text-[#6E7691] text-center">
            🎓 Student Initiatives
          </h1>

          <Card className="p-6 shadow bg-[#1A1F3B] border border-[#3B82F6]">
            <h2 className="font-semibold text-[#b3ab8a]">Scholarship Fund 2025</h2>
            <p className="text-sm text-[#A1A6B8] mt-1">
              Help support underprivileged students
            </p>

            {/* Progress bar */}
            <div className="w-full bg-[#3B82F6]/30 rounded-full h-2 mt-4">
              <div
                className="bg-[#3B82F6] h-2 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="text-sm text-[#A1A6B8] mt-2">
              ₹70,000 raised of ₹1,00,000
            </p>

            {/* Donor list */}
            <div className="mt-4 text-sm text-[#A1A6B8]">
              <p className="font-medium text-[#b3ab8a] mb-2">Recent Donors:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Priya Sharma – ₹2000</li>
                <li>Rahul Verma – ₹1000</li>
                <li>Ananya Singh – ₹500</li>
              </ul>
            </div>

            <Button className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2 rounded-lg font-medium">
              Donate
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
