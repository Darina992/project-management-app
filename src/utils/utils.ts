export function validateLogins(login: string) {
  return login.length >= 2;
}

export function validatePasswords(password: string) {
  //const re = /\S+@\S+\.\S+/  re.test(login);;
  return true;
}
