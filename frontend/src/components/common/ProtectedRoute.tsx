import { useAuthStore } from "../../store/auth.store"
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({children}: Props) =>{
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  if(!user || !token){
    return <Navigate to="/login" replace/>
  }

  return <>{children}</>
}

export default ProtectedRoute