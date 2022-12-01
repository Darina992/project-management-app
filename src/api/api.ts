import { apiPath, apiEndpoints, METHODS } from './apiPath';
import { IUser, IToken, ITask } from './typesApi';
import { IBodyTask } from 'types/boardPageType';
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
  async getUser(id: string): Promise<IUser> {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.users}${id}`, {
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
      throw new Error('Failed get user info');
    }
  },
  async deleteUser(): Promise<number | undefined> {
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
      return response.status;
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
        method: METHODS.post,
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
      throw new Error('Failed to create board');
    }
  },
  async getAllBoards() {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}`, {
        method: METHODS.get,
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
      throw new Error('Failed get all boards');
    }
  },
  async getBoardId(id: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}${id}`, {
        method: METHODS.get,
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
      throw new Error('Failed get all board');
    }
  },
  async updateBoardId(id: string, title: string, description: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}/${id}`, {
        method: METHODS.put,
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
      throw new Error('Failed to update board');
    }
  },
  async deleteBoard(id: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}/${id}`, {
        method: METHODS.delete,
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
      throw new Error('Board is not deleted');
    }
  },
  async createNewColumn(boardId: string, title: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}`,
        {
          method: METHODS.post,
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
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Failed to create column');
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
  async getBoard(idBoard: string) {
    try {
      const response = await fetch(`${apiPath}${apiEndpoints.boards}/${idBoard}`, {
        method: METHODS.get,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('$token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
      throw new Error('Board was not founded!');
    }
  },
  async createColumn(boardId: string, title: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}`,
        {
          method: METHODS.post,
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
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async getColumn(boardId: string, columnId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}`,
        {
          method: METHODS.get,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async deleteColumn(boardId: string, title: string, columnId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}`,
        {
          method: METHODS.delete,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async updateColumn(boardId: string, title: string, columnId: string, order: number) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}`,
        {
          method: METHODS.put,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            order: order,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async getAllColumns(boardId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}`,
        {
          method: METHODS.get,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async getAllTasks(boardId: string, columnId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}/${apiEndpoints.tasks}`,
        {
          method: METHODS.get,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
  async getTask(boardId: string, columnId: string, taskId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}/${apiEndpoints.tasks}/${taskId}`,
        {
          method: METHODS.get,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        console.log('404', response.status);
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Task was not founded!');
    }
  },
  async updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    body: IBodyTask
  ): Promise<ITask | undefined> {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}/${apiEndpoints.tasks}/${taskId}`,
        {
          method: METHODS.put,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: body.title,
            order: body.order,
            description: body.description,
            userId: body.userId,
            boardId: boardId,
            columnId: columnId,
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
      throw new Error('Task is not updated');
    }
  },
  async deleteTask(boardId: string, columnId: string, taskId: string) {
    try {
      const response = await fetch(
        `${apiPath}${apiEndpoints.boards}/${boardId}/${apiEndpoints.columns}/${columnId}/${apiEndpoints.tasks}/${taskId}`,
        {
          method: METHODS.delete,
          headers: {
            Authorization: `Bearer ${getFromLocalStorage('$token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('Board was not founded!');
    }
  },
};
