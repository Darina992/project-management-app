import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { pink } from '@mui/material/colors';
import { AppDispatch, RootState } from 'store';
import { deleteBoardID, getAllBoard, updateBoard } from 'store/boardReduser';
import { IBoard } from '../../types/boardsTypes';

export const BoardRender: FC<{ id: string; title: string; description: string }> = ({
  id,
  title,
  description,
}: IBoard) => {
  const { translate } = useSelector((state: RootState) => state.langReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [idBoard, setIdBoard] = useState<string>('');
  const [descriptionBoard, setDescriptionBoard] = useState('');
  const [nameBoard, setNameBoard] = useState('');
  const [disabledBtnModal, setDisabledBtnModal] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [updateBoardAll, setUpdateBoardAll] = useState(false);

  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    nameBoard.length > 0 ? setDisabledBtnModal(false) : setDisabledBtnModal(true);
  }, [nameBoard]);

  useEffect(() => {
    dispatch(getAllBoard());
  }, [updateBoardAll]);

  const handleUpdateBoard = () => {
    const data = {
      id: idBoard,
      title: nameBoard,
      description: descriptionBoard,
    };
    dispatch(updateBoard(data));
    setOpenModal(false);
    setUpdateBoardAll(!updateBoardAll);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    setIdBoard(clases[1]);
    setOpenModal(true);
  };

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clases = e.currentTarget.classList;
    setIdBoard(clases[1]);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
    dispatch(deleteBoardID(idBoard));
    setUpdateBoardAll(!updateBoardAll);
  };

  return (
    <Grid item xs={12} sm={4} md={3} key={'w'}>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal" component="form">
          <TextField
            id="standard-basic"
            label={translate.boardSearchInput}
            variant="standard"
            onChange={(e) => setNameBoard(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={7}
            placeholder={translate.boardDescription}
            onChange={(e) => setDescriptionBoard(e.target.value)}
          />
          <Button
            type="submit"
            disabled={disabledBtnModal}
            className="board__add-btn"
            variant="outlined"
            onClick={() => {
              handleUpdateBoard();
            }}
          >
            {translate.boardCreate}
          </Button>
        </Box>
      </Modal>
      <Card>
        <CardActionArea>
          <Link className="board__link" to={`/board/${id}`}>
            <CardMedia
              component="img"
              height="100"
              image="https://images.unsplash.com/photo-1621618765466-a0e74bd22170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              alt="green iguana"
            />
            <CardContent>
              <Typography noWrap gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography noWrap variant="body2">
                {description}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <div className={`button-icon ${id} chahge`} onClick={(e) => handleSubmit(e)}>
              <ModeRoundedIcon id="44" color="success" />
            </div>
            <div className={`button-icon ${id} delete`} onClick={(e) => handleClickOpen(e)}>
              <DeleteRoundedIcon id="55" sx={{ color: pink[500] }} />
            </div>
            <Dialog
              open={open}
              keepMounted
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {translate.confirmationToDelete}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDelete} color="primary">
                  {translate.ok}
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                  {translate.close}
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
