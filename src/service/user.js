

import { api } from "./api";



export const fetchUsers = async () => {

    const { data } = await api.get('admin/users');
    return data;
  };

