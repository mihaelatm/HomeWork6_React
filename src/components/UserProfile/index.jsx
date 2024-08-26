import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      setUser(response.data.results[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false); // Обновляем состояние загрузки при ошибке
    }
  }

  return (
    <div className={styles.user__container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <>
            <img src={user.picture.large} alt="UserPhoto" />
            <h3>
              {user.name.first} {user.name.last}
            </h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>

            <button onClick={fetchUser} className={styles.button}>
              Load New User
            </button>
          </>
        )
      )}
    </div>
  );
}

export default UserProfile;
