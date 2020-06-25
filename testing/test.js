const users = require('./users')

// write some tests
describe('api', () => {
    test('findUser', () => {
        users.findUser(1, user => {
            expect(user.id).toBe(1)
        })
    })
    test('deleteUser', () => {
        users.deleteUser(1, user => {
            expect(user.id).toBe(1)
        })
    })
    test('otherUser', () => {
        users.deleteUser(2, user => {
            expect(user.id).toBe(2)
        })
    })
    test('findOtherUser', () => {
        users.findUser(2, user => {
            expect(user).toBe('Error: No user with id "2"')
        })
    })
})

