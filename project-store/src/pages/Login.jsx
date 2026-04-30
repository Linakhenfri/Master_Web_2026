import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@dzshop.dz' && password === '123456') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert("Invalid credentials! Try admin@dzshop.dz / 123456");
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh] bg-background">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-textDark p-2 mb-4 rounded bg-background text-textDark"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-textDark p-2 mb-6 rounded bg-background text-textDark"
        />

        <button className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-primary/90 transition">
          Login
        </button>
      </form>
    </div>
  );
}