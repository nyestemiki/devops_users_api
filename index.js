const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const bodyParser = require('body-parser')
const uuid = require('uuid')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// user: { id, name, email, photo, phone, address }
const users = []

app.get('/', (_, res) => res.send('All good!'))

app.get('/users', (_, res) => {
	res.send(JSON.stringify(users))
})

app.get('/user/:id', (req, res) => {
	res.send(JSON.stringify(_.filter(users, { id: req.params.id })?.[0]))
})

app.post('/user', (req, res) => {
	const { name, email, photo, phone, address } = req.body
	const id = uuid.v4()

	const user = { id, name, email, photo, phone, address }

	users.push(user)

	res.send(JSON.stringify(user))
})

app.put('/user/:id', (req, res) => {
	const { id } = req.params
	const { name, email, photo, phone, address } = req.body

	const user = _.find(users, u => u.id === id)

	if (!user) {
		res.send(null)
		return
	}

	// Apply set fields only
	if (name) {
		user.name = name
	}

	if (email) {
		user.email = email
	}

	if (photo) {
		user.photo = photo
	}

	if (phone) {
		user.phone = phone
	}

	if (address) {
		user.address = address
	}

	res.send(JSON.stringify(user))
})

app.delete('/user/:id', (req, res) => {
	const { id } = req.params

	const user = _.find(users, u => u.id === id)

	if (!user) {
		res.send('Not found')
		return
	}

	_.remove(users, u => u.id === id)

	res.send('Deleted')
})

app.listen(4000, () => console.log('Server started on localhost:4000'))
