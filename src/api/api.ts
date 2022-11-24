import { apiPath, apiEndpoints } from './apiPath';
import { IUser, IToken, ITask } from './typesApi';
import { getFromLocalStorage } from '../utils/utils';

export const api = {
  async createNewUser(name: string, login: string, password: string): Promise<IUser | number> {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.signup}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          login: login,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 409) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  async signInUser(login: string, password: string): Promise<IToken | number> {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.signin}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 403) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Authorization failed');
    }
  },
  async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.users}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Failed get all users');
    }
  },
  async getUserById(): Promise<IUser> {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.users}${getFromLocalStorage('$userId')}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Failed get user info');
    }
  },
  async deleteUser() {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.users}${getFromLocalStorage('$userId')}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
          },
        }
      );
    } catch (error) {
      throw new Error('User is not deleted');
    }
  },
  async editUser(name: string, login: string, password: string): Promise<IUser | undefined> {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.users}${getFromLocalStorage('$userId')}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            login: login,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error('User is not found');
    }
  },
  async createNewBoard(title: string, description: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
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
  },
  async getAllBoards() {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Failed get all users');
    }
  },
  async getBoardId(id: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
        },
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
      throw new Error('Failed get all users');
    }
  },
  async updateBoardId(id: string, title: string, description: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
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
      throw new Error('Failed get all users');
    }
  },
  async deleteBoard(id: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      }
    } catch (error) {
      throw new Error('User is not deleted');
    }
  },
  async createNewColumn(boardId: string, title: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        console.log(Promise.reject(new Error(response.statusText)));
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
  async createTask(
    boardId: string,
    columnId: string,
    title: string,
    description: string,
    userId: string
  ): Promise<ITask | undefined> {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}/${apiEndpoints.tasks}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            description: description,
            userId: userId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Task is not created');
    }
  },
};
