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
  const config = createAuthConfig(token);
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