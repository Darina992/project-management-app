export const style = {
  userInfoConteiner: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '300px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fed0d2',
    color: 'inherit',
    outline: 'none',
    border: '2px solid white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  },
};
