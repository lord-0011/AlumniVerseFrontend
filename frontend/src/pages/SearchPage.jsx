import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAll } from '../api';
import { User, Briefcase, MessageSquare } from 'lucide-react';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState({ alumni: [], jobs: [], posts: [] });
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const data = await searchAll(token, query);
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [query]);

  if (loading) return <div>Searching...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      
      {/* Alumni Results */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><User className="mr-3 text-blue-500" /> Alumni ({searchResults.alumni.length})</h2>
        <div className="space-y-3">
          {searchResults.alumni.map(alum => (
            <Link key={alum._id} to={`/profile/${alum._id}`} className="block p-3 rounded-lg hover:bg-gray-50">
              <p className="font-bold">{alum.name}</p>
              <p className="text-sm text-gray-600">{alum.jobTitle} at {alum.currentCompany}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Job Results */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Briefcase className="mr-3 text-green-500" /> Jobs ({searchResults.jobs.length})</h2>
        <div className="space-y-3">
          {searchResults.jobs.map(job => (
            <Link key={job._id} to={`/jobs/${job._id}`} className="block p-3 rounded-lg hover:bg-gray-50">
              <p className="font-bold">{job.title}</p>
              <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Post Results */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center"><MessageSquare className="mr-3 text-yellow-500" /> Posts ({searchResults.posts.length})</h2>
        <div className="space-y-3">
          {searchResults.posts.map(post => (
            <Link key={post._id} to={`/posts/${post._id}`} className="block p-3 rounded-lg hover:bg-gray-50">
              <p className="text-sm italic">"{post.content}"</p>
              <p className="text-xs text-gray-500 mt-1">- by {post.user.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;