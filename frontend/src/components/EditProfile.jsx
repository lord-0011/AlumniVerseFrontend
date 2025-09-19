import { useState } from "react";
import { Card, Button } from "../components/UI";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [university, setUniversity] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated!");
  };

  const inputClasses =
    "w-full px-4 py-2 bg-[#3B82F6] text-white border border-blue-600 rounded-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white";

  return (
    <div className="min-h-screen bg-[#0F1120] flex justify-center items-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-lg bg-[#1C2A5A] border border-blue-600">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Profile
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              University
            </label>
            <input
              type="text"
              placeholder="University Name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Batch */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">Batch</label>
            <input
              type="text"
              placeholder="Batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Location / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-blue-400 font-medium mb-2">
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-blue-400 font-medium mb-2">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-blue-400 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="text-blue-200"
              />
              {profilePic && (
                <span className="text-blue-200 text-sm">
                  {profilePic.name}
                </span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full md:w-1/2 bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
