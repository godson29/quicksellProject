import React from 'react';
import HighPriorityIcon from '../assets/Img - High Priority.svg';
import LowPriorityIcon from '../assets/Img - Low Priority.svg';
import MediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import UrgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg';
import NoPriorityIcon from '../assets/No-priority.svg';
import InProgressIcon from '../assets/in-progress.svg';
import BacklogIcon from '../assets/Backlog.svg';
import ToDoIcon from '../assets/To-do.svg';

const priorityIcons = {
  0: NoPriorityIcon,
  1: LowPriorityIcon,
  2: MediumPriorityIcon,
  3: HighPriorityIcon,
  4: UrgentPriorityIcon,
};

const statusIcons = {
  'In progress': InProgressIcon,
  'Backlog': BacklogIcon,
  'Todo': ToDoIcon,
};

const Card = ({ id, title, tag, status, priority, userId }) => {
  const avatarUrl = `https://robohash.org/${userId}.png?size=50x50`;  // Use RoboHash avatar service

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-left">
          <span className="card-id">{id}</span>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-header-right">
          <img
            src={priorityIcons[priority]}
            alt={`Priority ${priority}`}
            className="priority-icon"
          />
          <div className="user-avatar">
            <img src={avatarUrl} alt="user avatar" className="avatar-icon" />
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="status">
          <img src={statusIcons[status]} alt={status} className="status-icon" />
          <span>{status}</span>
        </div>
      </div>
      <div className="card-tags">
        {tag.map((item, index) => (
          <span key={index} className="tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
