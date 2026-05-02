const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    navigate("/");
  } else {
    alert(data.message);
  }
};
