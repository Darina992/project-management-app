import { apiPath, usersEndpoint } from './apiPath';
import { IUser, INewUser } from './typesApi';

export const api = {
  async createNewUser(
    firstName: string,
    email: string,
    password: string
  ): Promise<INewUser | undefined> {
    try {
      const response = await fetch('http://134.209.192.22:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName,
          login: email,
          password: password,
        }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        return await Promise.reject(new Error(response.statusText));
      }
    } catch (error) {
      throw new Error('length must be at least 8 characters long');
    }
  },
};
