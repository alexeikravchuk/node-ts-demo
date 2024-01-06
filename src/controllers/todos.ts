import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = ((req, res, next) => {
  const {text} = req.body as { text: string }
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({message: 'Created the todo', createdTodo: newTodo})
})

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos: TODOS})
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const {text} = req.body as { text: string }
  const {id} = req.params

  const todo = TODOS.find((todo => todo.id === id))

  if (!todo) {
    throw new Error('Could not find todo!')
  }

  todo.text = text

  res.json({message: 'Updated', updatedTodo: todo})
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const {id} = req.params

  const todoIndex = TODOS.findIndex((todo => todo.id === id))

  if (todoIndex < 0) {
    throw new Error('Could not find todo!')
  }

  const todo = TODOS.splice(todoIndex, 1)

  res.json({message: 'Todo deleted', deletedTodo: todo})
}