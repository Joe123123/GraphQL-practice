import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = (loading, error, data) => {
    if (loading) {
      return <option>Loading...</option>;
    } else if (error) {
      return <option>Error :(</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Authors:</label>
          <select>
            <option value="">select author</option>
            {displayAuthors(loading, error, data)}
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}
