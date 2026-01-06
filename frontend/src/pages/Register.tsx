import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { registerApi } from "../api/auth.api";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerApi(name, email, password);
      login(res.user, res.token);
      console.log(res);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      console.log(error, "Error while registering, handleSubmit function");
      toast.error("Error while registering")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <label>Email: </label>
      <input
        type="email"
        placeholder="abc@email.com"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <label>Password: </label>
      <input
        type="password"
        placeholder="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button>Register</button>
    </form>
  );
}

export default Register;
