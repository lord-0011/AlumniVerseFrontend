import { Card, Button } from "./UI"; 
import Layout from "../components/Layout";

const data = [
  { name: "Priya Sharma", batch: "2018", points: 1200 },
  { name: "Rahul Verma", batch: "2016", points: 950 },
  { name: "Sneha Gupta", batch: "2019", points: 870 },
];

export default function Leaderboard() {
  return (
    <Layout>
      <div className="p-6 min-h-screen bg-[#0F111A]">
        <h1 className="text-3xl font-bold mb-6 text-[#E2E8F0] text-center">
          🏆 Alumni Leaderboard
        </h1>
        <div className="flex flex-col items-center space-y-4">
          {data.map((alumni, i) => (
            <Card
              key={i}
              className="p-6 flex justify-between items-center bg-[#1A1F3B] shadow-md rounded-lg w-full max-w-4xl"
            >
              <div>
                <h2 className="font-semibold text-[#6E86FF] text-lg">
                  {alumni.name}
                </h2>
                <p className="text-sm text-gray-400">Batch of {alumni.batch}</p>
              </div>
              <span className="font-bold text-[#3B82F6] text-lg">{alumni.points} pts</span>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
