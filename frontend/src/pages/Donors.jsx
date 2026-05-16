import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Droplet } from 'lucide-react';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newDonor, setNewDonor] = useState({
    full_name: '', age: '', gender: 'Male', blood_group: 'O+', phone: '', email: '', address: ''
  });

  // Fetch real donors from backend
  const fetchDonors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/donors', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(d => 
    (d.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     d.phone?.includes(searchTerm)) &&
    (!bloodFilter || d.blood_group === bloodFilter)
  );

  const handleAddDonor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/donors', newDonor, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('✅ Donor added successfully!');
      setShowAddModal(false);
      setNewDonor({ full_name: '', age: '', gender: 'Male', blood_group: 'O+', phone: '', email: '', address: '' });
      fetchDonors(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add donor');
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header and Filters same as before */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Donor Management</h1>
          <p className="text-gray-600">Total Donors: {donors.length}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2">
          <Plus size={20} /> Add New Donor
        </button>
      </div>

      {/* Search & Filter - same as before */}

      {/* Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Donor ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Blood Group</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map(donor => (
              <tr key={donor.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{donor.donor_id}</td>
                <td className="px-6 py-4 font-medium">{donor.full_name}</td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">{donor.blood_group}</span>
                </td>
                <td className="px-6 py-4">{donor.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1 rounded-full text-xs font-medium ${donor.eligibility_status === 'Eligible' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {donor.eligibility_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal - Improved */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-6">Register New Donor</h2>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <input type="text" placeholder="Full Name" required value={newDonor.full_name} onChange={(e) => setNewDonor({...newDonor, full_name: e.target.value})} className="w-full p-4 border rounded-2xl" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Age" required value={newDonor.age} onChange={(e) => setNewDonor({...newDonor, age: e.target.value})} className="w-full p-4 border rounded-2xl" />
                <select value={newDonor.gender} onChange={(e) => setNewDonor({...newDonor, gender: e.target.value})} className="w-full p-4 border rounded-2xl">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <select value={newDonor.blood_group} onChange={(e) => setNewDonor({...newDonor, blood_group: e.target.value})} className="w-full p-4 border rounded-2xl">
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <input type="tel" placeholder="Phone Number" required value={newDonor.phone} onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})} className="w-full p-4 border rounded-2xl" />
              <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-2xl font-semibold">
                {loading ? 'Adding...' : 'Register Donor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;