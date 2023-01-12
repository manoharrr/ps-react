import { request, gql } from 'graphql-request';

export interface User {
    name: string,
    email: string;
    phone: number;
    city: string;
    occupation: string;
    income: number;
    pan: string;
    password: string;
}
export async function createUser(Obj: User) {
    const query = gql`
        mutation createUser($email:String!,$password:String!,$name: String!,$phone: String!,$city: String!,$occupation: String!,$pan: String!,$income: Float!){
            createUser(userInput:{name:$name,email:$email,password:$password,pan:$pan,phone:$phone,city:$city,occupation:$occupation,income:$income})
        }
    `
    let variable = { "name": Obj.name, "email": Obj.email, "password": Obj.password, "pan": Obj.pan, "phone": Obj.phone, "city": Obj.city, "occupation": Obj.occupation, "income": Number(Obj.income) }
    return await request(`${process.env.REACT_APP_MONGO_URL}`, query, variable)
}