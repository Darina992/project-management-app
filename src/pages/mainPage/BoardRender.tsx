import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';

export const BoardRender: FC = () => {
  return (
    <Grid item xs={12} sm={4} md={3} key={'w'}>
      <Card>
        <Link className="board__link" to={'./'}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image="https://images.unsplash.com/photo-1621618765466-a0e74bd22170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              alt="green iguana"
            />
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="div">
                Lizard riiiiiiiiii roppppppppppp
              </Typography>
              <Typography noWrap variant="body2">
                Lizards are a widespread rriiiiii roooooooo rooooooooo
              </Typography>
            </CardContent>
            <CardActions>
              <div className="button-icon">
                <ModeRoundedIcon color="success" />
              </div>
              <div className="button-icon">
                <DeleteRoundedIcon sx={{ color: pink[500] }} />
              </div>
            </CardActions>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
};
