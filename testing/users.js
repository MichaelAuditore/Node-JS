const users = new Array(20).fill(0)
  .map((_, i) => {
    return {
      id: i,
      createdAt: Date.now() + i,
      email: `readycoder${i}@gmail.com`
    }
  })

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  const user = users.find(user => user.id === id)
  if (user) {
    return resolve(user)
  }
  reject(new Error(`No user with id "${id}"`))
})

// simulate async db call with promise
const deleteUser = (given_id) => new Promise((resolve, reject) => {
  const i = users.findIndex(user => user.id === given_id)
  if (i < 0) {
    return reject(new Error(`No user with id "${given_id}"`))
  }

  users.splice(i)
  resolve({ given_id })
})

module.exports = {
  findUser,
  deleteUser
}
