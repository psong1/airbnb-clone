import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [user, setUser] = useState(null);
  // Search bar state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchGuests, setSearchGuests] = useState("");

  const navigate = useNavigate();

  // Persist user login
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleSignUpClick = () => {
    setMenuOpen(false);
    setShowRegister(true);
    setRegisterError("");
    setRegisterSuccess("");
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    setShowLogin(true);
    setLoginError("");
    setLoginSuccess("");
  };

  const closeRegisterModal = () => {
    setShowRegister(false);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setRegisterError("");
    setRegisterSuccess("");
  };

  const closeLoginModal = () => {
    setShowLogin(false);
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setLoginSuccess("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    if (password.length < 8) {
      setRegisterError("Password must be at least 8 characters.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          role: "guest"
        })
      });
      if (res.ok) {
        const user = await res.json();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setRegisterSuccess("Registration successful!");
        setTimeout(() => closeRegisterModal(), 1000);
        // Remove navigation to profile - keep on home page
      } else {
        const data = await res.json();
        setRegisterError(data.message || "Registration failed");
      }
    } catch (err) {
      setRegisterError("Network error. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoginSuccess("Login successful!");
        setTimeout(() => closeLoginModal(), 1000);
        navigate('/profile');
      } else {
        const data = await res.json();
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Search bar submit (no logic yet)
  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search logic
    alert(`Searching for ${searchLocation} on ${searchDate} for ${searchGuests} guests`);
  };

  // Avatar click handler for navigation
  function Navbar({ onAvatarClick }) {
    return (
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/image/logo.png" alt="Logo" className="navbar-logo" style={{cursor:'pointer'}} onClick={() => navigate('/')} />
        </div>
        <form className="navbar-searchbar" onSubmit={handleSearch}>
          <input className="searchbar-input" id="search-location" name="search_location" type="text" placeholder="Anywhere" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
          <span className="searchbar-divider" />
          <input className="searchbar-input" id="search-date" name="search_date" type="text" placeholder="Any Week" value={searchDate} onChange={e => setSearchDate(e.target.value)} />
          <span className="searchbar-divider" />
          <input className="searchbar-input" id="search-guests" name="search_guests" type="text" placeholder="Add Guests" value={searchGuests} onChange={e => setSearchGuests(e.target.value)} />
          <button className="searchbar-btn" type="submit"><span role="img" aria-label="search">🔍</span></button>
        </form>
        <div className="navbar-right">
          <span className="navbar-home-link">Airbnb your home</span>
          <div style={{ position: 'relative' }}>
            <button className="user-menu-btn" onClick={() => setMenuOpen((open) => !open)}>
              <span className="user-menu-icon">☰</span>
              <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {user?.photo ? (
                  <img src={user.photo} alt="User" className="user-avatar-photo" />
                ) : (
                  <span className="user-avatar-initial">{user?.first_name?.[0] || "?"}</span>
                )}
              </span>
            </button>
            {menuOpen && (
              <div className="user-dropdown">
                {user ? (
                  <>
                    <div className="user-dropdown-item">My favorites</div>
                    <div className="user-dropdown-item">My reservations</div>
                    <div className="user-dropdown-item">My properties</div>
                    <div className="user-dropdown-divider"></div>
                    <div className="user-dropdown-item" onClick={handleLogout}>Logout</div>
                  </>
                ) : (
                  <>
                    <div className="user-dropdown-item" onClick={handleLoginClick}>Login</div>
                    <div className="user-dropdown-item" onClick={handleSignUpClick}>Sign up</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Profile Page Component
  function ProfilePage() {
    const maskEmail = (email) => {
      if (!email) return '';
      const [name, domain] = email.split('@');
      return name[0] + '***' + name[name.length-1] + '@' + domain;
    };
    return (
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-sidebar-section profile-sidebar-active">Account information</div>
          <div className="profile-sidebar-section">🧳 Past trips</div>
        </aside>
        <main className="profile-main">
          <h2 style={{fontSize:'2rem',fontWeight:700,marginBottom:32}}>Account information</h2>
          <div className="profile-info-list">
            {/* Legal name (read-only) */}
            <div className="profile-info-row">
              <div style={{flex:1}}>
                <div className="profile-info-label">Legal name</div>
                <div className="profile-info-value">{user?.first_name} {user?.last_name}</div>
              </div>
            </div>
            {/* Email address (read-only) */}
            <div className="profile-info-row">
              <div style={{flex:1}}>
                <div className="profile-info-label">Email address</div>
                <div className="profile-info-value">{maskEmail(user?.email)}</div>
              </div>
            </div>
            {/* Remove password reset section */}
          </div>
        </main>
      </div>
    );
  }

  // RequireAuth wrapper for protected routes
  function RequireAuth({ children }) {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // Main App with Router
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar onAvatarClick={() => window.location.href='/profile'} />} />
        <Route path="/profile" element={
          <RequireAuth>
            <><Navbar onAvatarClick={() => {}} /><ProfilePage /></>
          </RequireAuth>
        } />
      </Routes>
      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay" onClick={closeRegisterModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Register</div>
              <button className="modal-close" onClick={closeRegisterModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-welcome">Welcome to Airbnb</div>
              <div className="modal-subtitle">Create an account!</div>
              <form className="modal-form" onSubmit={handleRegister}>
                <input className="modal-input" id="register-email" name="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input className="modal-input" id="register-first-name" name="first_name" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                <input className="modal-input" id="register-last-name" name="last_name" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                <input className="modal-input" id="register-password" name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                {registerError && <div className="modal-error">{registerError}</div>}
                {registerSuccess && <div className="modal-success">{registerSuccess}</div>}
                <button className="modal-continue-btn" type="submit">Continue</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Sign In</div>
              <button className="modal-close" onClick={closeLoginModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-welcome">Welcome back</div>
              <div className="modal-subtitle">Sign in to your account</div>
              <form className="modal-form" onSubmit={handleLogin}>
                <input className="modal-input" id="login-email" name="email" type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                <input className="modal-input" id="login-password" name="password" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                {loginError && <div className="modal-error">{loginError}</div>}
                {loginSuccess && <div className="modal-success">{loginSuccess}</div>}
                <button className="modal-continue-btn" type="submit">Continue</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
