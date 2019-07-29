const queryResolvers = require("./resolvers/query/queryResolvers");
const mutationUserResolvers = require("./resolvers/mutation/mutationResolvers");

module.exports = {
  ...queryResolvers,
  ...mutationUserResolvers
};

// module.exports ={
//     Query:{
//         async test(parent, args, context, info){
//             return "Hello World"
//         },
//         async listAllItems(parent, args, {postgres}, info) {
//             try {
//               const query = {
//                 text: "SELECT id, name FROM items"
//               };
//               const result = await postgres.query(query);
//               return result.rows;

//             } catch(e) {
//               console.log(e.detail)
//             }
//           }
//     }
// }
