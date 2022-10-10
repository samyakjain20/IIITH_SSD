const Query = require('../models/queryModel')
const mongoose = require('mongoose')

// get all query
const getQueries = async (req, res) => {
  const user_id = req.user._id

  const queries = await Query.find({user_id}).sort({createdAt: -1})

  res.status(200).json(queries)
}

// get a single query
const getQuery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such query'})
  }

  const query = await Query.findById(id)

  if (!query) {
    return res.status(404).json({error: 'No such query'})
  }
  
  res.status(200).json(query)
}


// create new query
const createQuery = async (req, res) => {
  const {exname, course, qno, taroll, comments} = req.body
  console.log("body: " , req.body);
  let emptyFields = []

  if(!exname) {
    emptyFields.push('exname')
  }
  if(!course) {
    emptyFields.push('course')
  }
  if(!qno) {
    emptyFields.push('qno')
  }
  if(!taroll) {
    emptyFields.push('taroll')
  }
  if(!comments) {
    emptyFields.push('comments')
  }
  console.log("empty: ", emptyFields);
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const query = await Query.create({exname, course, qno, taroll, comments, user_id})
    // console.log("query: ", query)
    res.status(200).json(query)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a query
const deleteQuery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such query'})
  }

  const query = await Query.findOneAndDelete({_id: id})

  if (!query) {
    return res.status(400).json({error: 'No such query'})
  }

  res.status(200).json(query)
}

// update a query
const updateQuery = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such query'})
  }

  const query = await Query.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!query) {
    return res.status(400).json({error: 'No such query'})
  }

  res.status(200).json(query)
}


module.exports = {
  getQueries,
  getQuery,
  createQuery,
  deleteQuery,
  updateQuery
}