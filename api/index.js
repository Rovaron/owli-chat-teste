const router = require('express').Router();

/*-------------
DISCLAIMER:
Todo o código das rotas deveria/poderia ser melhor implementado, separando as regras de negócio da camada de transporte,
o que deixaria a API testável, sem fazer requests de dentro da aplicação, pra dentro dela mesma (estranhão)
e facilitaria também o desenvolvimento de novas features de um futuro incerto (pensei em uns services genéricos marotos).
MAAAAS no entanto, todavia, por motivos de "deadline is coming" e "talvez não vá usar isso", acabou sendo entregue dessa forma.
Deixo aqui minhas sinceras desculpas e a promessa de que melhorarei isso, depois da semana do carnaval, não disse de qual ano.
--------------*/

router.use('/login', require('./login'))
router.use('/users',  require('./users'))

module.exports = router;