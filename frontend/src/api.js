const BASE_URL = "http://localhost:5000/api"; // backend URL

// Signup (Register)
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

// Login
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Add donation
export const addDonation = async (token, amount) => {
  const res = await fetch(`${BASE_URL}/donations`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};

// Get donations
export const getDonations = async (token) => {
  const res = await fetch(`${BASE_URL}/donations`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
};
