import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_ITEMS = gql`
  {
    listAllItems {
      id
      name
      description
    }
  }
`;
class ListItems extends Component {
  render() {
    return (
      <Query query={GET_ITEMS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log(data);
          return (
            // <select name='dog' onChange={onDogSelected}>
            //   {data.dogs.map(dog => (
            //     <option key={dog.id} value={dog.breed}>
            //       {dog.breed}
            //     </option>
            //   ))}
            // </select>
            <div>
              {data.listAllItems.map(item => (
                <div>
                  <p>Id:{item.id}</p>
                  <p>Name:{item.name}</p>
                  <p>Description:{item.description}</p>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ListItems;
