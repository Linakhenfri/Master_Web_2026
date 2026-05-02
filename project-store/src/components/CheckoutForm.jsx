const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          userId: 1, // ولا تجيبيها من auth
          items: JSON.parse(localStorage.getItem("cart")) || []
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Purchase successful!");
        if (onSuccess) onSuccess();
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.log(err);
    }
  }
};
