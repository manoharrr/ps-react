import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${process.env.REACT_APP_MONGO_URL}`);

export async function getCCAccount() {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const variables = {}
    const query = gql`
        query getCCAccount{
            getCreditAccountDetails{
                cardType
                availableBalance
                totalBalance
                usedBalance
                annualCharges
            }
        }
    `
    return await client.request(query, variables, requestHeaders)
}

export async function createCCAccount(category: string) {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    let variables = { "category": category }
    const query = gql`
        mutation createCCAccount($category:String!){
            createCreditAccount(category:$category){
                cardType
                availableBalance
                totalBalance
                usedBalance
                annualCharges
            }
        }
    `
    return await client.request(query, variables, requestHeaders)
}

export async function addRemoveMoneyToCC(amount: number, transactionType: string) {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const query = gql`
        mutation addRemoveMoneyToCC($amount:Float!,$transactionType:String!){
            addRemoveCreditAccount(amount: $amount,transactionType: $transactionType){
                cardType
                availableBalance
                totalBalance
                usedBalance
                annualCharges
            }
        }
    `
    let variables = { "amount": amount, "transactionType": transactionType }
    return await client.request(query, variables, requestHeaders)
}

export async function upgradeCCAccount(type: string) {
    const token = JSON.parse(localStorage.getItem('token') || "");
    const requestHeaders = {
        Authorization: `Bearer ${token}`,
    }
    const query = gql`
        mutation upgradeCCAccount($type:String!){
            upgradeDowngradeCreditAccount(type:$type){
                cardType
                availableBalance
                totalBalance
                usedBalance
                annualCharges
            }
        }
    `
    let variables = { "type": type }
    return await client.request(query, variables, requestHeaders)
}