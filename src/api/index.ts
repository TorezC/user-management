export const baseURL = 'https://65b4fe3e41db5efd286728d2.mockapi.io';
// export const baseURL = 'https://jsonplaceholder.typicode.com';

// Get all users
export const getUsers = async () => {
    try {
      const response = await fetch(`${baseURL}/users`);

      if (response.ok) {
		return await response.json();
	}
	return Promise.reject(response.status); 
   
    } catch (error) {
        console.log(error)
    }
}

// Get a user
export const getUser = async (userId: string) => {
    try {
      const response = await fetch(`${baseURL}/users/${userId}`);

      if (response.ok) {
		return await response.json();
	}
	return Promise.reject(response.status); 
   
    } catch (error) {
        console.log(error)
    }
}

export const editUser = async (userId: string, updatedUser: any) => {
    const response = await fetch(`${baseURL}/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json();
};

export const createUser = async (createUser: any) => {
    const response = await fetch(`${baseURL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json();
};

export const deleteUser = async (userId: string) => {
    const response = await fetch(`${baseURL}/users/${userId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  
    return response.json();
  };