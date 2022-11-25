export const style = {
  userInfoConteiner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '350px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Caveat, cursive',
    fontWeight: '600',
    color: '#5b1c52',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#eceaeb',
    color: 'inherit',
    outline: 'none',
    border: '2px solid white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  },
};
