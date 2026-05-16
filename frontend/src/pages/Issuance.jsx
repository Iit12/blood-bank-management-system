import { useState, useEffect } from 'react';
import axios from 'axios';

const Issuance = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [availableStock, setAvailableStock] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedBag, setSelectedBag] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [reqRes, stockRes] = await Promise.all([
        axios.get('http://localhost:5000/api/requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get('http://localhost:5000/api/inventory', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);
      setPendingRequests(reqRes.data);
      setAvailableStock(stockRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssue = async () => {
    if (!selectedRequest || !selectedBag) {
      setMessage("Please select a request and a blood bag");
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/issue', {
        request_id: selectedRequest.id,
        bag_id: selectedBag
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setMessage("✅ Blood issued successfully!");
      fetchData();
      setSelectedRequest(null);
      setSelectedBag('');
    } catch (err) {
      setMessage("❌ Failed to issue blood");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blood Issuance</h1>
      <p className="text-gray-600 mb-8">Issue blood with compatibility verification</p>

      {message && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-2xl">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Requests */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="font-semibold mb-4">Pending Requests</h2>
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            pendingRequests.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-4 mb-3 rounded-2xl cursor-pointer border-2 ${selectedRequest?.id === req.id ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
              >
                <strong>{req.blood_group}</strong> - {req.quantity_ml} ml 
                <span className="text-xs block text-gray-500">Urgency: {req.urgency}</span>
              </div>
            ))
          )}
        </div>

        {/* Available Bags */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="font-semibold mb-4">Available Blood Bags</h2>
          {availableStock.length === 0 ? (
            <p>No available blood bags</p>
          ) : (
            availableStock.map(bag => (
              <div
                key={bag.bag_id}
                onClick={() => setSelectedBag(bag.bag_id)}
                className={`p-4 mb-3 rounded-2xl cursor-pointer border-2 ${selectedBag === bag.bag_id ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
              >
                {bag.bag_id} - <strong>{bag.blood_group}</strong>
                <span className="text-xs block text-gray-500">Expires: {bag.expiry_date}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={handleIssue}
        disabled={!selectedRequest || !selectedBag || loading}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-6 rounded-3xl text-xl font-semibold"
      >
        {loading ? 'Issuing...' : 'Issue Selected Blood'}
      </button>
    </div>
  );
};

export default Issuance;