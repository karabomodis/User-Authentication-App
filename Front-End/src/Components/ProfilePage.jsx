import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

          if (!token) {
              window.location.href = "/";
              return;
    }

      try {
        const res = await fetch("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={()=>{localStorage.removeItem("token");window.location.href ="/";}}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

