import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Droplet } from 'lucide-react';

const Inventory = () => {
  const [stock, setStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStock(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      blood_group: e.target.blood_group.value,
      collection_date: e.target.collection_date.value,
    };

    try {
      await axios.post('http://localhost:5000/api/inventory', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      alert('✅ Blood Unit Added Successfully!');
      setShowModal(false);
      fetchStock();        // ← This refreshes the list
      e.target.reset();
    } catch (err) {
      alert('❌ Error adding unit');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Blood Inventory</h1>
          <p className="text-gray-600">Total Units: <span className="font-bold">{stock.length}</span></p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={20} /> Add Blood Unit
        </button>
      </div>

      {/* Blood Group Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(group => {
          const count = stock.filter(s => s.blood_group === group).length;
          return (
            <div key={group} className="bg-white p-6 rounded-3xl shadow border border-red-100 text-center">
              <div className="text-3xl font-bold text-red-600">{group}</div>
              <div className="text-5xl font-bold mt-3">{count}</div>
              <p className="text-gray-500 text-sm">units</p>
            </div>
          );
        })}
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-lg">All Blood Units</h3>
        </div>
        {stock.length === 0 ? (
          <p className="p-10 text-center text-gray-500">No blood units yet. Click "Add Blood Unit" to add some.</p>
        ) : (
          <div className="divide-y">
            {stock.map(item => (
              <div key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <span className="font-bold text-xl">{item.blood_group}</span>
                  <span className="ml-4 text-gray-500 font-mono">{item.bag_id}</span>
                </div>
                <div className="text-right">
                  <p>Collected: {item.collection_date}</p>
                  <p className="text-orange-600">Expires: {item.expiry_date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Add New Blood Unit</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Blood Group</label>
                <select name="blood_group" required className="w-full p-4 border rounded-2xl text-lg">
                  {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Collection Date</label>
                <input 
                  type="date" 
                  name="collection_date" 
                  required 
                  className="w-full p-4 border rounded-2xl text-lg" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border rounded-2xl">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="flex-1 bg-red-600 text-white py-4 rounded-2xl">
                  {loading ? 'Adding...' : 'Add Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;