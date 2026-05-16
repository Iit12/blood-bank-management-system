import { useState, useEffect } from 'react';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleNewRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      hospital_id: 1, // Default hospital (you can expand later)
      blood_group: e.target.blood_group.value,
      quantity_ml: parseInt(e.target.quantity_ml.value),
      urgency: e.target.urgency.value
    };

    try {
      await axios.post('http://localhost:5000/api/requests', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('✅ Request Submitted Successfully!');
      setShowModal(false);
      fetchRequests();
      e.target.reset();
    } catch (err) {
      alert('❌ Failed to submit request');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Blood Requests</h1>
          <p className="text-gray-600">Manage incoming requests from hospitals</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
        >
          + New Request
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Request ID</th>
              <th className="px-6 py-4 text-left">Hospital</th>
              <th className="px-6 py-4 text-left">Blood Group</th>
              <th className="px-6 py-4 text-left">Quantity (ml)</th>
              <th className="px-6 py-4 text-left">Urgency</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-500">No requests yet</td>
              </tr>
            ) : (
              requests.map(req => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono">{req.request_id}</td>
                  <td className="px-6 py-4">{req.hospital_name || 'General Hospital'}</td>
                  <td className="px-6 py-4 font-bold">{req.blood_group}</td>
                  <td className="px-6 py-4">{req.quantity_ml}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1 rounded-full text-sm ${req.urgency === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {req.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Pending</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">New Hospital Request</h2>
            <form onSubmit={handleNewRequest} className="space-y-5">
              <div>
                <label className="block text-sm mb-2">Blood Group</label>
                <select name="blood_group" required className="w-full p-4 border rounded-2xl">
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Quantity (ml)</label>
                <input type="number" name="quantity_ml" defaultValue="350" required className="w-full p-4 border rounded-2xl" />
              </div>

              <div>
                <label className="block text-sm mb-2">Urgency Level</label>
                <select name="urgency" required className="w-full p-4 border rounded-2xl">
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border rounded-2xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;