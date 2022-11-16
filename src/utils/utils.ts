export function validateEmails(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePasswords(password: string) {
  //const re = /\S+@\S+\.\S+/;
  return true;
}
