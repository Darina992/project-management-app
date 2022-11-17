import { apiPath, usersEndpoint } from './apiPath';
import { IUser, INewUser } from './typesApi';

export const api = {
  async createNewUser(name: string, login: string, password: string): Promise<IUser | number> {
    try {
      const response = await fetch('http://134.209.192.22:4000/signup', {
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
        window.location.href = '/main';
        return data;
      } else if (response.status === 409) {
        console.log('Login is repeated');
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('length must be at least 8 characters long');
    }
  },

  async signInUser(login: string, password: string): Promise<IUser | number> {
    try {
      const response = await fetch('http://134.209.192.22:4000/signin', {
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
        //window.location.href = '/main';
        return data;
      } else if (response.status === 403) {
        console.log('User not registered');
        return response.status;
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('length must be at least 8 characters long');
    }
  },
};
