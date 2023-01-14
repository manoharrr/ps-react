import { request, gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${process.env.REACT_APP_MONGO_URL}`);

export async function getToken(email: string, password: string) {
    const query = gql`
        query getToken($email:String!,$password:String!){
            login(email: $email,password: $password){
                user {
                    name
                    email
                    phone
                    city
                    pan
                    occupation
                    income
                }
                auth{
                    token
                }
            }
        }
    `
    let variable = { "email": email, "password": password }
    return await request(`${process.env.REACT_APP_MONGO_URL}`, query, variable)
}

export async function getSBAccount() {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const variables = {}
    const query = gql`
        query getSBAccount{
            checkSABalance{
                category
                accBalance
                minBalance
            }
        }
    `
    return await client.request(query, variables, requestHeaders)
    // return await request(`${process.env.REACT_APP_MONGO_URL}`, query)
}

export async function createSBAccount() {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const variables = {}
    const query = gql`
        mutation createSBAccount{
            createSBAccount{
                category
                accBalance
                minBalance
            }
        }
    `
    return await client.request(query, variables, requestHeaders)
}

export async function addRemoveMoneyToSB(amount: number, transactionType: string) {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const query = gql`
        mutation addRemoveMoneyToSB($amount:Float!,$transactionType:String!){
            addRemoveSBAccountBalance(amount: $amount,transactionType: $transactionType){
                category
                accBalance
                minBalance
            }
        }
    `
    let variables = { "amount": amount, "transactionType": transactionType }
    return await client.request(query, variables, requestHeaders)
}

export async function upgradeSBAccount(type: string) {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const query = gql`
        mutation upgradeSBAccount($type:String!){
            upgradeDowngradeSBAccount(type:$type){
                category
                accBalance
                minBalance
            }
        }
    `
    let variables = { "type": type }
    return await client.request(query, variables, requestHeaders)
}

export async function showTransactions() {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const query = gql`
        query showTransactions{
            showTransactions{
                _id
                transactionType
                accountType
                amount
                createdAt
            }
        }
    `
    let variables = {}
    return await client.request(query, variables, requestHeaders)
}