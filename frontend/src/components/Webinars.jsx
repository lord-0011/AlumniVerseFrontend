import { Card, Button } from "./UI"; 
import Layout from "../components/Layout";

const webinars = [
  { title: "AI in Healthcare", date: "25 Sept, 6 PM IST" },
  { title: "Career Growth in Tech", date: "1 Oct, 5 PM IST" },
  { title: "Blockchain & Finance", date: "10 Oct, 7 PM IST" },
  { title: "UI/UX Design Trends", date: "15 Oct, 4 PM IST" },
  { title: "Machine Learning Basics", date: "20 Oct, 6 PM IST" },
];

export default function Webinars() {
  return (
    <Layout>
      <div className="p-6 min-h-screen bg-[#0F111A] flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold mb-6 text-[#6E7691] text-center">
            🎤 Upcoming Webinars
          </h1>
          
          <div className="grid gap-4">
            {webinars.map((w, i) => (
              <Card
                key={i}
                className="p-6 shadow-md rounded-lg bg-[#1A1F3B] border border-[#3B82F6]"
              >
                <h2 className="text-xl font-semibold text-[#91896E]">{w.title}</h2>
                <p className="text-[#C0C5D0] text-sm mt-1">Date: {w.date}</p>
                <div className="flex justify-end mt-4">
                  <Button className="px-5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium">
                    Register
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
