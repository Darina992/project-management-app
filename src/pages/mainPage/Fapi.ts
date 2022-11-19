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

export const postBoards = async () => {
  const res = await fetch('http://localhost:4000/boards', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenU}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: '111 tasks',
      description: 'My board 1111',
    }),
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  console.log(data);
  postBoards2();
};
export const postBoards2 = async () => {
  const res = await fetch('http://localhost:4000/boards', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenU}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: '222 tasks',
      description: 'My board 222',
    }),
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  console.log(data);
};
let id = '';
export const getusers = async () => {
  const res = await fetch('http://localhost:4000/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenU}`,
    },
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  console.log(data);
  id = data[3].id;
  console.log(id);
};
export const getData = async () => {
  const res = await fetch('http://localhost:4000/boards', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenU}`,
    },
  });
  if (!res.ok) {
    console.error(res);
  }
  const data = await res.json();
  console.log(data);
};
