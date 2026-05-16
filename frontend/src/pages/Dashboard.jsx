import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const bloodDistribution = [
    { name: 'O+', value: 35, color: '#dc2626' },
    { name: 'A+', value: 28, color: '#f97316' },
    { name: 'B+', value: 22, color: '#eab308' },
    { name: 'AB+', value: 15, color: '#22c55e' },
  ];

  const donationTrend = [
    { month: 'Jan', donations: 420 },
    { month: 'Feb', donations: 380 },
    { month: 'Mar', donations: 510 },
    { month: 'Apr', donations: 490 },
    { month: 'May', donations: 630 },
  ];

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 text-xl">Real-time Blood Bank Overview</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Units", value: "1,284", color: "red" },
          { label: "Donors Today", value: "23", color: "emerald" },
          { label: "Pending Requests", value: "7", color: "amber" },
          { label: "Low Stock", value: "3", color: "rose" },
        ].map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white rounded-3xl p-8 shadow-xl">
            <p className="text-gray-500">{s.label}</p>
            <p className="text-6xl font-bold mt-4 text-gray-900">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="font-semibold mb-6">Blood Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={bloodDistribution} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value">
                {bloodDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="font-semibold mb-6">Donation Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#dc2626" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;