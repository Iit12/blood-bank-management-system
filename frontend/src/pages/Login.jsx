import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Use: admin@bbms.com / password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-red-600">BBMS</h1>
          <p className="text-gray-600 mt-3 text-xl">Blood Bank Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-red-600 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-red-600 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-gray-500">
          Default Login<br />
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin@bbms.com</span> / password
        </div>
      </motion.div>
    </div>
  );
};

export default Login;