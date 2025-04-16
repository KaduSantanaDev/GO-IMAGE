const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
})

app.get('/', (req, res) => {
  pool.query(`INSERT INTO people(name) VALUES('Kadu')`, (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err)
      return res.status(500).send('Erro ao inserir dados')
    }

    pool.query('SELECT name FROM people', (err, results) => {
      if (err) {
        console.error('Erro ao buscar dados:', err)
        return res.status(500).send('Erro ao buscar dados')
      }

      let list = results.map(r => `<li>${r.name}</li>`).join('')
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`)
    })
  })
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
