import React, { useEffect, useState } from 'react';
import { loginToSAP, getAllClients } from '../services/sapService';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Log in to SAP B1
        await loginToSAP();

        // Fetch all clients
        const clientData = await getAllClients();
        setClients(clientData);
      } catch (error) {
        setError('Error fetching clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Client List</h2>
      <table>
        <thead>
          <tr>
            <th>Card Code</th>
            <th>Card Name</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.CardCode}>
              <td>{client.CardCode}</td>
              <td>{client.CardName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;