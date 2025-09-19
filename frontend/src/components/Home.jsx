import { Card, Button } from "../components/UI";
import Footer from "../components/Footer";

const features = [
  { title: "Leaderboard", description: "See top alumni contributing to the community and compete with peers." },
  { title: "Premium Benefits", description: "Get exclusive coupons, travel vouchers, and other perks as a premium member." },
  { title: "Webinars", description: "Attend webinars hosted by industry experts and alumni leaders." },
  { title: "Referrals", description: "Refer students for internships, jobs, and scholarships easily." },
  { title: "Micro-Donations", description: "Contribute small amounts to scholarships, labs, or student projects transparently." },
];

const alumniList = [
  { name: "Aditya Kumar", batch: "BTech 2025", location: "Delhi, India", position: "Software Engineer at Google", college: "Lovely Professional University", profilePic: "https://i.pravatar.cc/150?img=1" },
  { name: "Ananya Sharma", batch: "BTech 2024", location: "Bangalore, India", position: "Data Analyst at Microsoft", college: "IIT Bombay", profilePic: "https://i.pravatar.cc/150?img=2" },
  { name: "Rohit Singh", batch: "BTech 2023", location: "Mumbai, India", position: "Product Manager at Amazon", college: "BITS Pilani", profilePic: "https://i.pravatar.cc/150?img=3" },
  { name: "Neha Patel", batch: "BTech 2025", location: "Chennai, India", position: "UI/UX Designer at Adobe", college: "SRM University", profilePic: "https://i.pravatar.cc/150?img=4" },
  { name: "Aditya Verma", batch: "BTech 2022", location: "Kolkata, India", position: "Researcher at IBM", college: "Jadavpur University", profilePic: "https://i.pravatar.cc/150?img=5" },
];

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0F111A" }} className="min-h-screen text-[#E2E8F0]">
      <div className="p-8 space-y-12">

        {/* Alumni Section */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-10">Featured Alumni</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {alumniList.map((alumni, idx) => (
              <Card
                key={idx}
                dark
                className="items-center hover:-translate-y-1 hover:shadow-2xl transition duration-300"
              >
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={alumni.profilePic}
                    alt={alumni.name}
                    className="w-28 h-28 rounded-full object-cover border-2 border-blue-800"
                  />
                  <h2 className="text-xl font-semibold">{alumni.name}</h2>
                  <p className="text-sm">{alumni.batch}</p>
                  <p className="text-sm">{alumni.location}</p>
                  <p className="text-sm font-medium">{alumni.position}</p>
                  <p className="text-sm font-medium">{alumni.college}</p>
                </div>

                {/* Buttons in a single row */}
                <div className="mt-4 w-full flex flex-row gap-2">
                  <Button className="flex-1">Connect</Button>
                  <Button className="flex-1">Message</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Cards Section */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">AlumniVerse Features</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                dark
                className="text-center hover:shadow-2xl transition duration-300"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                  <p className="text-sm">{feature.description}</p>
                </div>

                {/* Button at bottom */}
                <div className="mt-4">
                  <Button>Explore</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
