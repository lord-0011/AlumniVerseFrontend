import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api';

const JobDetailPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getJobById(token, id);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div>Loading job...</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
      <p className="text-xl font-semibold text-gray-600">{job.company}</p>
      <p className="text-md text-gray-500">{job.location} • {job.type}</p>
      <div className="mt-6 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
      </div>
      <div className="mt-6 text-right">
        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetailPage;