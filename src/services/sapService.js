import axios from 'axios';

const SAP_BASE_URL = 'http://<SAP_SERVER>:<PORT>/b1s/v1';

// Function to log in to SAP B1
const loginToSAP = async () => {
  const credentials = {
    UserName: '<USERNAME>',
    Password: '<PASSWORD>',
    CompanyDB: '<COMPANY_DB>',
  };

  try {
    const response = await axios.post(`${SAP_BASE_URL}/Login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Store the session ID for further requests
    const sessionId = response.headers['set-cookie'][0].split(';')[0];
    axios.defaults.headers.common['Cookie'] = sessionId;

    return response.data;
  } catch (error) {
    console.error('Error logging in to SAP B1:', error);
    throw error;
  }
};

// Function to get all clients (business partners)
const getAllClients = async () => {
  try {
    const response = await axios.get(`${SAP_BASE_URL}/BusinessPartners`, {
      params: { $select: 'CardCode,CardName' }, // Fetch specific fields
    });

    return response.data.value; // SAP returns data in 'value' array
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export { loginToSAP, getAllClients };