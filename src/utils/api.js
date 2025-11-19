const BASE_URL = "http://localhost:5000/api/v1";

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
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Login failed");
  }

  // Backend mengembalikan { message, data: { token, user } }
  return { error: false, data: responseJson.data };
}

async function register({ name, username, email, password }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, email, password }),
  });

  const responseJson = await response.json();

  // Check jika response tidak OK atau ada error dari backend
  if (!response.ok) {
    throw new Error(responseJson.message || "Registration failed");
  }

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

async function getTicketsByMachine(machineId) {
  const response = await fetchWithToken(
    `${BASE_URL}/machines/${machineId}/tickets`
  );
  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      data: null,
      message: responseJson.message || "Failed to fetch tickets",
    };
  }

  return { error: false, data: responseJson.data.tickets };
}

async function getTickets() {
  // const data = ticket;
  const response = await fetchWithToken(`${BASE_URL}/tickets`);
  const responseJson = await response.json();
  return { error: false, data: responseJson.data.tickets };
  // return { error: false, data };
}

async function getMachines() {
  const response = await fetchWithToken(`${BASE_URL}/machines`);
  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      data: null,
      message: responseJson.message || "Failed to fetch machines",
    };
  }

  return { error: false, data: responseJson.data.machines };
}

// Untuk submit tiket baru
async function createTicket(ticketData) {
  const body = {
    productId: ticketData.machine,
    priority: ticketData.priority.toUpperCase(),
    status: "OPEN",
    problem: ticketData.problem,
    problemDetail: ticketData.detail,
    isPublished: true,
  };

  const response = await fetchWithToken(`${BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to create ticket");
  }

  return { error: false, data: responseJson.data.ticket };
}

async function updateTicket(ticketId, ticketData) {
  // Format data sesuai dengan struktur API
  const body = {
    productId: ticketData.machine,
    priority: ticketData.priority.toUpperCase(),
    problem: ticketData.problem,
    problemDetail: ticketData.problemDetail,
  };

  const response = await fetchWithToken(`${BASE_URL}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to update ticket");
  }

  return { error: false, data: responseJson.data.ticket };
}

async function deleteTicket(ticketId) {
  const response = await fetchWithToken(`${BASE_URL}/tickets/${ticketId}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      message: responseJson.message || "Failed to delete ticket",
    };
  }

  return { error: false, message: responseJson.message };
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
  getTickets,
  getMachines,
  getTicketsByMachine,
  createTicket,
  updateTicket,
  deleteTicket,
};
