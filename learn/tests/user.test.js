import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../prisma/src/prisma'
import seedDatabase, { userOne }  from './jest/utils/seedDatabase'
import getClient from './jest/utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser (
                data: {
                    name: "Loth Rauzes",
                    email: "loth.ydoan.rauzes@test.com",
                    password: "loth1234"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({
        mutation: createUser
    })

    const exists = await prisma.exists.User({id: response.data.createUser.user.id })
    expect(exists).toBe(true)

})

test('Should expose public author profiles', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `
    const response = await client.query({ query: getUsers })
    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jast Rauzes')
})

test('Should not login with bad credentials', async () => {
    const login = gql`
        mutation {
            login (
                data: {
                    email: "loth.ydoan.rauzes@test.com",
                    password: "loth1234ss"
                }
            ) {
                token
            }
        }
    `
    await expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('Should not login with short Password', async () => {
    const createUser = gql`
        mutation {
            createUser (
                data: {
                    name: "Loth Rauzes",
                    email: "loth.ydoan.rauzes@test.com",
                    password: "l4"
                }
            ){
                token
            }
        }
    `
    await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)
    const getProfile = gql`
        query {
            me {
                id
                name
                email
            }
        }
    `
    const { data } = await client.query({ query: getProfile })

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})