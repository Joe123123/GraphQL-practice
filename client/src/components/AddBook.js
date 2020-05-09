import React, { Component, useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { useMutation, useQuery } from "@apollo/react-hooks";

import {
  getAuthorsQuery,
  addBookMutation,
  getBookQuery,
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", genre: "", authorId: "" };
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading...</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: { ...this.state },
      refetchQueries: [{ query: getBookQuery }],
    });
  }

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label>Book Name:</label>
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={(e) => this.setState({ genre: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Authors:</label>
            <select
              onChange={(e) => this.setState({ authorId: e.target.value })}
            >
              <option value="">select author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

// export default function AddBook() {
//   const [state, setState] = useState({
//     name: "",
//     genre: "",
//     authorId: "",
//   });
//   const [addBook] = useMutation(addBookMutation);
//   const { loading, data } = useQuery(getAuthorsQuery);
//   const displayAuthors = (loading, data) => {
//     if (loading) {
//       return <option disabled>Loading...</option>;
//     } else {
//       return data.authors.map((author) => (
//         <option key={author.id} value={author.id}>
//           {author.name}
//         </option>
//       ));
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addBook({ variables: { ...state } });
//   };
//   return (
//     <div>
//       <form id="add-book" onSubmit={handleSubmit}>
//         <div className="field">
//           <label>Book Name:</label>
//           <input
//             type="text"
//             onChange={(e) => setState({ ...state, name: e.target.value })}
//           />
//         </div>
//         <div className="field">
//           <label>Genre:</label>
//           <input
//             type="text"
//             onChange={(e) => setState({ ...state, genre: e.target.value })}
//           />
//         </div>
//         <div className="field">
//           <label>Authors:</label>
//           <select
//             onChange={(e) => setState({ ...state, authorId: e.target.value })}
//           >
//             <option value="">select author</option>
//             {displayAuthors(loading, data)}
//           </select>
//         </div>
//         <button>+</button>
//       </form>
//     </div>
//   );
// }
