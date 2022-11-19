import { IBoard } from '../../types/boardsTypes';

export const userTo = async () => {
  const res = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'asel',
      login: 'asel1234',
      password: 'asel1234',
    }),
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  console.log(data);
};
let tokenU = '';
export const userIn = async (): Promise<void> => {
  const res = await fetch('http://localhost:4000/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: 'asel1234',
      password: 'asel1234',
    }),
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  tokenU = data.token;
  //   console.log(header);
  console.log(data.token);
};

export const createNewBoard = async (title: string, description: string) => {
  try {
    const response = await fetch('http://localhost:4000/boards', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenU}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return response.status;
    } else {
      return await Promise.reject(new Error(response.statusText));
    }
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const getAllBoards = async (): Promise<IBoard[]> => {
  try {
    const response = await fetch(`http://localhost:4000/boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenU}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return await Promise.reject(new Error(response.statusText));
    }
  } catch (error) {
    throw new Error('Failed get all users');
  }
};

export const getBoardId = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:4000/boards/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenU}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 404) {
      return response.status;
    } else {
      return await Promise.reject(new Error(response.statusText));
    }
  } catch (error) {
    throw new Error('Failed get all users');
  }
};

export const updateBoardId = async (id: string, title: string, description: string) => {
  try {
    const response = await fetch(`http://localhost:4000/boards/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${tokenU}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 404) {
      return response.status;
    } else {
      return await Promise.reject(new Error(response.statusText));
    }
  } catch (error) {
    throw new Error('Failed get all users');
  }
};

export const deleteBoard = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:4000/boards${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenU}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('response.ok', response.ok);
      console.log(data);
      return data;
    } else if (response.status === 404) {
      return response.status;
    }
  } catch (error) {
    throw new Error('User is not deleted');
  }
};
