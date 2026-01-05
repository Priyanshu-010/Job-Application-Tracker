import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {login} = useAuthStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await loginApi(email, password)
      login(res.user, res.token)
      console.log(res)
      toast.success(res.message)
      navigate("/")
    } catch (error) {
      console.log(error, "Error while logging in handleSubmit function")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Login</button>
    </form>
  );
}

export default Login;
