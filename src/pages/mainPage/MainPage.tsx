import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getFromLocalStorage } from 'utils/utils';
import { apiPath } from 'api/apiPath';

export const MainPage = () => {
  // const [boards, setBoards] = useState<{ id: string; title: string; description: string }>();
  useEffect(() => {
    // fetch(`${apiPath}boards`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${getFromLocalStorage('$token')}`,
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: 'Homework tasks',
    //     description: 'My board tasks',
    //   }),
    // })
    //   .then((responce) => responce.json())
    //   .then((data) => console.log(data));
    fetch(`${apiPath}boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getFromLocalStorage('$token')}`,
      },
    })
      .then((responce) => responce.json())
      .then((data) => console.log(data));
  }, []);
  const id = '6049deec-d6e6-4a46-bd44-f83e2ea58ef5';
  return (
    <Box>
      <Link className="board__link" to={`/board/${id}`}>
        Board
      </Link>
    </Box>
  );
};
