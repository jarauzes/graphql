import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../prisma/src/prisma'
import seedDatabase, { userOne }  from './jest/utils/seedDatabase'
import getClient from './jest/utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

test('Should exposed published post', async () => {
    const getPosts = gql`
        query {
            Posts {
                title
                body
                published
                author {
                    name
                }
            }
        }
    `
    const response = await client.query({ query: getPosts })
    console.log(response)
    expect(response.data.Posts.length).toBe(1)
    expect(response.data.Posts[0].published).toBe(true)
    expect(response.data.Posts[0].author.name).toBe('Jast Rauzes')
})

test('Should fetch myPost', async () => {
    const client = getClient(userOne.jwt)
 
    const myPosts = gql`
        query {
            myPosts {
                id
                title
                body
                published
            }
        }
    `
    const { data } = await client.query({ query: myPosts })
    expect(data.myPosts.length).toBe(2)
    expect(data.myPosts[0].published).toBe(true)
    expect(data.myPosts[1].published).toBe(false)

})