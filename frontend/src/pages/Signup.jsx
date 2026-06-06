import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signup = async () => {
    try {
      await API.post("/auth/signup", form);

      alert("Signup Successful");

      navigate("/");
    } catch (err) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button onClick={signup}>
        Signup
      </button>

      <p>
        Already have account?
        <Link to="/"> Login</Link>
      </p>
    </div>
  );
}

export default Signup;