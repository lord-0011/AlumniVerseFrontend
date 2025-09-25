import React, { useState, useMemo } from 'react';
import { mockJobs } from '../mockJobs'; // Import the mock data

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter jobs based on the search term
  const filteredJobs = useMemo(() => {
    if (!searchTerm) {
      return mockJobs;
    }
    return mockJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      {/* Header and Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Board</h1>
        <p className="text-gray-600 mt-2">
          Discover exclusive opportunities posted by fellow alumni.
        </p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
                  <p className="text-md font-semibold text-gray-700">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition">
                  Apply
                </button>
              </div>
              <p className="text-gray-700 mt-4">{job.description}</p>
              <div className="border-t border-gray-200 mt-4 pt-3 text-right">
                <p className="text-xs text-gray-500">
                  Posted by <span className="font-semibold">{job.alumniPoster}</span> • {job.posted}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white text-center p-8 rounded-lg shadow-md">
            <p className="text-gray-600">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;