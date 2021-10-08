import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 style={{ fontSize: '1rem', color: 'blue' }} className="card-header bg-primary text-light p-2 m-0">
              {thought.user.username} <br />
              <span style={{ fontSize: '1rem', color: 'blue' }}>
                had this thought on {thought.created_at}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p style={{ fontSize: '1rem', color: 'blue' }}>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;