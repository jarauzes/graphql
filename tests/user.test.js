import { getFirstName, isValidPassword } from '../prisma/src/utils/user'

test('Should return name when given fullName', () => {
    const firstName = getFirstName('Joey Suarez')
    expect(firstName).toBe('Joey')
})

test('Should return name when given only frist name', () => {
    const firstName = getFirstName('dale')
    expect(firstName).toBe('dale')
})

test('Should reject password Shorter than 8 Characters', () => {
    const isValid = isValidPassword('dale')
    expect(isValid).toBe(false)
})

test('Should reject password containing word "password"', () => {
    const isValid = isValidPassword('dalepassWord12345')
    expect(isValid).toBe(false)
})

test('Should reject password Valid', () => {
    const isValid = isValidPassword('dale12345')
    expect(isValid).toBe(true)
})