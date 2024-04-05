import { useEffect } from 'react'
import useUsersStore from '../store/usersStore';
import authService from '../services/auth.service';

export default function useGetUsers() {
    const setUsers = useUsersStore(state => state.setUsers)

    useEffect(() => {
        const fetchData = async () => {
            const list = await authService.getAllUsers()
            setUsers(list)
        }
        fetchData()

    }, [setUsers]);
    return
}
