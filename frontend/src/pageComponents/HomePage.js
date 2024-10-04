import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function HomePage() {
  const { user } = useAuth0();
  return (
    <div>
      {user?.name ? (
        <div>
        <div>
          <Link to={"/studio"}>
            <button>Studio</button>
          </Link>
        </div>
        </div>
      ) : (
        <div>
          Please log in to access this content.
        </div>
      )}
    </div>
  );
}
