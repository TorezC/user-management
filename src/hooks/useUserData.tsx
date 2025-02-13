import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api';


const useUserData = () => {
  return useQuery({
    queryKey: ['getUsers'],
    queryFn: getUsers
  });
}

export default useUserData