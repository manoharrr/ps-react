import { graphql } from 'msw';

export const handlers = [

    graphql.query('login', (req, res, ctx) => {
        const { email, password } = req.variables
        if (email === "manoharmanu95@gmail.com" && password === "dummytext")
            return res(
                ctx.data({
                    login: {
                        auth: {
                            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JiYzllYzUxNjhiNzc0NzVmYzIyZWIiLCJlbWFpbCI6Im1hbm9oYXJtYW51OTVAZ21haWwuY29tIiwiaWF0IjoxNjczODUwMzAwLCJleHAiOjE2NzM4NTM5MDB9.Qgw00JVNb-KAB8cN0fLR2ac5gg8gwXpnbn_3Q0fI_OI"
                        }
                    },
                }),
                ctx.delay(150)
            )
        else {
            return res(
                ctx.status(500),
                ctx.errors([{ message: "User does not exist!" }])
            );
        }
    }),
]