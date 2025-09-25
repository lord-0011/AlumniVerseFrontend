import React from 'react';
import StudentDashboard from './StudentDashboard';
import AlumniDashboard from './AlumniDashboard';

const HomePage = ({ user, userName }) => {
  // Check the user's role and render the appropriate dashboard,
  // passing down the user and userName props to both.
  if (user.type === 'alumni') {
    return <AlumniDashboard user={user} userName={userName} />;
  } else {
    return <StudentDashboard user={user} userName={userName} />;
  }
};

export default HomePage;