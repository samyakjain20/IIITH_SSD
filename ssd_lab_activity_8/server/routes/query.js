const express = require('express')
const {
  createQuery,
  getQueries,
  getQuery,
  deleteQuery,
  updateQuery
} = require('../controllers/queryController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all queries routes
router.use(requireAuth)

// GET all Querys
router.get('/', getQueries)

//GET a single Query
router.get('/:id', getQuery)

// POST a new Query
router.post('/', createQuery)

// DELETE a Query
router.delete('/:id', deleteQuery)

// UPDATE a Query
router.patch('/:id', updateQuery)


module.exports = router