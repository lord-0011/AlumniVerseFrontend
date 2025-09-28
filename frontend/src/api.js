import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"; // Your backend server URL

// Function to get the auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Function to create a standard config object with the auth token
const createAuthConfig = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// --- Auth Functions ---
export const registerUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return data;
};

// --- User Profile Functions ---
export const getUserProfile = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/users/profile`, config);
  return data;
};

export const updateUserProfile = async (token, profileData) => {
  const config = createAuthConfig(token);
  const { data } = await axios.put(`${BASE_URL}/users/profile`, profileData, config);
  return data;
};

// --- Post Functions ---
export const createPost = async (token, postData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(`${BASE_URL}/posts`, postData, config);
  return data;
};

export const getPosts = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/posts`, config);
  return data;
};

// --- Alumni Functions ---
export const getAllAlumni = async (token) => {
  const config = createAuthConfig(token);
  // Note: Your previous code used /alumni, but your backend route is /users/alumni
  const { data } = await axios.get(`${BASE_URL}/users/alumni`, config);
  return data;
};

// --- Mentorship Functions ---
export const createMentorshipRequest = async (token, alumniId, message) => {
  const config = createAuthConfig(token);
  const body = { message };
  const { data } = await axios.post(`${BASE_URL}/mentorship/request/${alumniId}`, body, config);
  return data;
};

export const getReceivedRequests = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/mentorship/requests/received`, config);
  return data;
};

export const updateRequestStatus = async (token, requestId, status) => {
  const config = createAuthConfig(token);
  const body = { status };
  const { data } = await axios.put(`${BASE_URL}/mentorship/requests/${requestId}`, body, config);
  return data;
};

// --- Donation Functions ---
export const addDonation = async (token, amount) => {
  const config = createAuthConfig(token);
  const { data } = await axios.post(`${BASE_URL}/donations`, { amount }, config);
  return data;
};

export const getDonations = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/donations`, config);
  return data;
};

export const getSentRequests = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/mentorship/requests/sent`, config);
  return data;
};

export const getMessages = async (token, mentorshipId) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/messages/${mentorshipId}`, config);
  return data;
};

export const getJobs = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/jobs`, config);
  return data;
};

// NEW: Function to create a new job posting
export const createJob = async (token, jobData) => {
  const config = createAuthConfig(token);
  const { data } = await axios.post(`${BASE_URL}/jobs`, jobData, config);
  return data;
};

export const getStartups = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/startups`, config);
  return data;
};

// NEW: Function to create a new startup
export const createStartup = async (token, startupData) => {
  const config = createAuthConfig(token);
  const { data } = await axios.post(`${BASE_URL}/startups`, startupData, config);
  return data;
};

// ... (other functions)

export const likePost = async (token, postId) => {
  const config = createAuthConfig(token);
  const { data } = await axios.put(`${BASE_URL}/posts/${postId}/like`, {}, config);
  return data;
};

export const commentOnPost = async (token, postId, text) => {
  const config = createAuthConfig(token);
  const { data } = await axios.post(`${BASE_URL}/posts/${postId}/comment`, { text }, config);
  return data;
};

export const getLeaderboardData = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/leaderboard`, config);
  return data;
};

export const getEvents = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/events`, config);
  return data;
};

export const createEvent = async (token, eventData) => {
  const config = createAuthConfig(token);
  const { data } = await axios.post(`${BASE_URL}/events`, eventData, config);
  return data;
};

export const getAlumniDashboardStats = async (token) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/alumni/dashboard`, config);
  return data;
};

export const searchAll = async (token, query) => {
  const config = createAuthConfig(token);
  // Pass the query as a URL parameter
  const { data } = await axios.get(`${BASE_URL}/search?q=${query}`, config);
  return data;
};

export const getUserById = async (token, userId) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`, config);
  return data;
};

export const getJobById = async (token, jobId) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/jobs/${jobId}`, config);
  return data;
};

export const getPostById = async (token, postId) => {
  const config = createAuthConfig(token);
  const { data } = await axios.get(`${BASE_URL}/posts/${postId}`, config);
  return data;
};