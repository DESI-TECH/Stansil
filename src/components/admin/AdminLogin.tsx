import { useState } from "react";
import { Lock } from "lucide-react";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "./types";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card rounded-lg shadow-steel p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-3">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter credentials to access the panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Enter username" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Enter password" />
          </div>
          {loginError && <p className="text-destructive text-sm">{loginError}</p>}
          <button type="submit" className="w-full bg-gold-gradient text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-gold">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
