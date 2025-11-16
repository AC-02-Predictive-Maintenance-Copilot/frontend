const BASE_URL = "http://localhost:5000/api/v1";
import ticket from "./data";
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const { toast } = await import("sonner");
  
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return { error: true, data: null, message: responseJson.message || "Login failed" };
  }

  // Backend mengembalikan { message, data: { token, user } }
  toast.success(`Login successful! Welcome back 👋 ${responseJson.data.user.name}`, {
    duration: 1500,
  });
  return { error: false, data: responseJson.data };
}

async function register({ name, username, email, password }) {
  const { toast } = await import("sonner");
  
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return { error: true, message: responseJson.message || "Registration failed" };
  }

  toast.success("Registration successful! Redirecting to login... 🎉", {
    duration: 1500,
  });

  return { error: false, data: responseJson.data };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/auth/me`);
  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.user };
}

function removeAccessToken() {
  return localStorage.removeItem("accessToken");
}

async function getTickets() {
  const data = ticket;
  return { error: false, data };
}

async function createTicket(ticketData) {
  console.log("Creating ticket:", ticketData);
}

async function deleteTicket(ticketId) {
  console.log("Deleting ticket with ID:", ticketId);
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
  getTickets,
  createTicket,
  deleteTicket,
};
