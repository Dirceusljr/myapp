const error = (err, res, next) => {
    if (err && res.status(404)) {
      console.error('Erro de requisitação!')
      return res.status(404).send('Página não encontrada!')
    }
    next
  }

    export {error};