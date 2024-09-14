import React, { useState, useEffect } from 'react';

export default function Github() {
  const [username, setUsername] = useState(""); // Default username
  const [userData, setUserData] = useState(null);       // Holds the fetched user data
  const [loading, setLoading] = useState(false);        // To show loading state
  const [error, setError] = useState(null);             // Error handling state

  async function fetchGithubUserData() {
    try {
      setLoading(true); // Start loading
      setError(null);   // Reset error before fetching

      const res = await fetch(`https://api.github.com/users/${username}`);

      const data = await res.json();
      if (data) {
        setUserData(data);  
        console.log(data);
      }
    } catch (e) {
      setError(e.message); // Set error if any
    } finally {
      setLoading(false);   // Stop loading
    }
  }

  function handleSubmit() {
    fetchGithubUserData(); // Fetch data on button click
  }

  useEffect(() => {
    fetchGithubUserData(); // Fetch data when the component loads for the default username
  }, []);  // Empty dependency array to run on component mount

  return (
    <div>
      <div className='input-wrapper'>
        <input
          type="text"
          value={username}
          placeholder='Search GitHub account...'
          name='search'
          onChange={(e) => setUsername(e.target.value)}  // Update username as you type
        />
        <button onClick={handleSubmit}>Search</button>   {/* Button calls handleSubmit */}
      </div>

      
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}
      
      {userData && !loading && !error && (
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <a href={userData.html_url} >
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}
