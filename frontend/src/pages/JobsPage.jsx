import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../api';
import { PlusCircle, Search } from 'lucide-react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getJobs(token);
        setJobs(data);
      } catch (err) {
        setError('Could not fetch jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!searchTerm) return jobs;
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Job Board</h1>
            <p className="text-gray-600 mt-2">Discover exclusive opportunities posted by alumni.</p>
          </div>
          
          {userRole === 'alumni' && (
            <Link to="/jobs/add" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center">
              <PlusCircle size={20} className="mr-2" />
              Post a Job
            </Link>
          )}
        </div>
        
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
      
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
                  <p className="text-md font-semibold text-gray-700">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                </div>
                
                <a 
                  href={job.applicationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                >
                  Apply
                </a>
              </div>
              <p className="text-gray-700 mt-4">{job.description}</p>
              <div className="border-t border-gray-200 mt-4 pt-3 text-right">
                <p className="text-xs text-gray-500">
                  Posted by <span className="font-semibold">{job.postedBy.name}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white text-center p-12 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">No Job Openings Found</h3>
            <p className="mt-1 text-gray-500">Check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;