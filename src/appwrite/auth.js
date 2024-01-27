/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account

  constructor () {
    this.client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }
  async createAccount ({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )

      if (userAccount) {
        //call another method
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (err) {
      throw err
    }
  }

  async login ({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      throw error
    }
  }

  async getCurrentUSer () {
    try {
      return await this.account.get()
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async logout () {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      throw error
    }
  }
}

//creating obj of class
const authService = new AuthService()
export default authService
