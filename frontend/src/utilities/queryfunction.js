import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";


export const LogOutHandle = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    queryClient.removeQueries('user');
    navigate('/');
}
