// guard especifico

const isAuthenticatedGuard = async (to, from, next) => {
  return new Promise(() => {
    const random = Math.random() * 100;
    if (random > 50) {
      console.log('esta autenticado');
      next();
    } else {
      console.log('bloqueado por el isAuthenticatedGuard', random);
      next({ name: 'pokemon-home' });
    }
  });
  console.log({ to, from, next });
};

export default isAuthenticatedGuard;
