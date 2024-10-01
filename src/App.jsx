import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import './styles.css'; 

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('');
  const [sortingOption, setSortingOption] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const groupedTickets = () => {
    const grouped = {};
    if (groupingOption === 'Priority') {
      tickets.forEach(ticket => {
        const priority = ticket.priority === 0 ? 'No Priority' : 
                        ticket.priority === 1 ? 'Low' : 
                        ticket.priority === 2 ? 'Medium' : 
                        ticket.priority === 3 ? 'High' : 
                        'Urgent';
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(ticket);
      });
    } else if (groupingOption === 'User') {
      tickets.forEach(ticket => {
        const userName = getUserName(ticket.userId);
        if (!grouped[userName]) {
          grouped[userName] = [];
        }
        grouped[userName].push(ticket);
      });
    } else if (groupingOption === 'Status') {
      tickets.forEach(ticket => {
        const status = ticket.status; // No prefix is used here
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(ticket);
      });
    }
    return grouped;
  };

  const sortTickets = (tickets) => {
    if (sortingOption === 'Priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'Title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); 
    }
    return tickets; 
  };

  const renderGroupedTickets = () => {
    const grouped = groupedTickets();
    return (
      <div className="group-container">
        {Object.entries(grouped).map(([key, group]) => (
          <div key={key} className="group">
            <h2>{key}</h2> {/* Directly render the key without "Priority:" or "User:" */}
            <div className="card-container">
              {sortTickets(group).map(ticket => (
                <Card key={ticket.id} {...ticket} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar 
        onGroupingChange={handleGroupingChange} 
        onSortingChange={handleSortingChange} 
      />
      {renderGroupedTickets()}
    </div>
  );
};

export default App;
