import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import moment from 'moment';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return (
      <div className="thoughtList">
        <h4>No Thoughts Yet</h4>
      </div>
    )
  }

  return (
    <div className="thoughtList">
      <h4>{title}</h4>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header">
              {thought.user.username} <br />
              <span className="postDate">
                had this thought on {moment(thought.created_at).format("MM/DD/YYYY")}
              </span>
            </h4>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;