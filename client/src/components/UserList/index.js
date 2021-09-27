import React from 'react';
import { Link } from 'react-router-dom';
import Ticker from '../Ticker/index';

const User = ({ _id, username }) => {
  return (
    <div key={_id} className="card mb-3">
      <h4 className="card-header bg-dark text-light p-2 m-0">
        <Link className="text-light" to={`/users/${_id}`}>
          {username}
        </Link>
      </h4>
    </div>
  );
};

const UserList = ({ users, title }) => {
  if (!users.length) return <h3>No Users</h3>;

  const renderUsers = () => {
    if (!users) return null;
    return (
      users.map(user => <User key={user._id} {...user} />)
      )
  }

  return (
    <>
      <h3>{title}</h3>
      {renderUsers()}
      <h3>Stock Ticker</h3>
      <Ticker/>
    </>
  );
};

export default UserList;
