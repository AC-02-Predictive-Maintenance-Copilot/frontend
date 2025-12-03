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
  const response = await fetchWithToken(`${BASE_URL}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
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

async function addMachine(machineData) {
  const body = {
    name: machineData.name,
    productId: machineData.productId,
  };
  const response = await fetchWithToken(`${BASE_URL}/machines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to add machine");
  }

  return { error: false, data: responseJson.data.machine };
}

async function deleteMachine(machineId) {
  const response = await fetchWithToken(`${BASE_URL}/machines/${machineId}`, {
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

async function editMachine(machineId, machineData) {
  const response = await fetchWithToken(`${BASE_URL}/machines/${machineId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(machineData),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to edit machine");
  }

  return { error: false, data: responseJson.data.machine };
}

// Machine Status API Functions
async function getMachineStatuses() {
  const response = await fetchWithToken(`${BASE_URL}/machine/status`);
  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      data: null,
      message: responseJson.message || "Failed to fetch machine statuses",
    };
  }

  return { error: false, data: responseJson.data };
}

async function getMachineStatusByMachineId(machineId) {
  const response = await fetchWithToken(`${BASE_URL}/machine/status/${machineId}`);
  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      data: null,
      message: responseJson.message || "Failed to fetch machine status",
    };
  }

  return { error: false, data: responseJson.data };
}

async function createMachineStatus(statusData) {
  const response = await fetchWithToken(`${BASE_URL}/machine/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusData),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to create machine status");
  }

  return { error: false, message: responseJson.message };
}

async function updateMachineStatus(statusId, statusData) {
  const response = await fetchWithToken(`${BASE_URL}/machine/status/${statusId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusData),
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    throw new Error(responseJson.message || "Failed to update machine status");
  }

  return { error: false, message: responseJson.message, data: responseJson.data };
}

async function deleteMachineStatus(statusId) {
  const response = await fetchWithToken(`${BASE_URL}/machine/status/${statusId}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (!response.ok || responseJson.error) {
    return {
      error: true,
      message: responseJson.message || "Failed to delete machine status",
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
  getTicketsByMachine,
  createTicket,
  updateTicket,
  deleteTicket,
  getMachines,
  addMachine,
  deleteMachine,
  editMachine,
  getMachineStatuses,
  getMachineStatusByMachineId,
  createMachineStatus,
  updateMachineStatus,
  deleteMachineStatus,
};
