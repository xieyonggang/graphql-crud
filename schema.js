const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema} = graphql;
const axios = require('axios');

const EmployeeType = new GraphQLObjectType ( {
    name: 'Employee',
    fields: () => ( {
        id: {type: GraphQLInt},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age:{type:GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType ({
    name:'RootQuery',
    fields: {
        employee : {
            type:EmployeeType ,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/employees/${args.id}`).then(res=>res.data)
            }
        },

        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/employees`)
                   .then(res => res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType ({
    name : 'mutation',
    fields : {
        addEmployee : {
            type: EmployeeType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                return axios.post(`http://localhost:3000/employees`, {
                    name: args.name,
                    email : args.email,
                    age: args.age
                }).then(res => res.data);
            }
        },
        editEmployee : {
            type:EmployeeType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                axios.patch(`http://localhost:3000/employees/${args.id}`, args)
                .then(res => res.data);
            }
        },
        deleteEmployee : {
            type: EmployeeType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                return axios.delete(`http://localhost:3000/employees/${args.id}`)
                .then(res=>res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: mutation
});