import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leaderboard.css'; // Import the CSS file
import { BarLoader } from 'react-spinners';
import confetti from 'canvas-confetti';

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  const runConfetti = () => {
    confetti({
      particleCount: 1500,
      spread: 220,
      origin: { y: 0.4 },
    });
  };

  useEffect(() => {
    
    // runConfetti();

    // uncomment this function when you get a tier to get a party popper like animation

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://script.google.com/macros/s/AKfycbz9pmOHxjAcZAvuisNIFJ_5s6KWmLv74GGQhB4FENvC2MxzlVH1n2cCBiaEcLV2O5LEKA/exec'
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filteredData = data.filter(row =>
    row['User Name'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>

     <div className="leaderboard-title">GenAI & Arcade Leaderboard</div>
     <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search Your Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    <div className="leaderboard-container">
    
    
      

      

      {loading ? (
        <p className="Loadingdata">
          <BarLoader width="100%" color="#0a0a6d" />
        </p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank.</th>
              <th>Name</th>
              <th className="email-column">User Email</th>
              <th>Access Code Redemption</th>
              <th>All Skill Badges & Games Completed</th>
              <th>No of Skill Badges Completed</th>
              <th>No of Arcade Games Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row['Sr No.']}</td>
                <td>{row['User Name']}</td>
                <td className="email-column">{row['User Email']}</td>
                <td className="centered-cell">
                  <p className={`${row['Access Code Redemption Status'] === 'Yes' ? 'yes-cell' : 'no-cell' }`} > {row['Access Code Redemption Status']}</p>
                </td>
                <td className="centered-cell">
                 <p className={`${row['All Skill Badges & Games Completed'] === 'Yes' ? 'yes-cell' : 'no-cell' }`} > {row['All Skill Badges & Games Completed']} </p>
                </td>
                <td className="centered-cell">{row['# of Skill Badges Completed']}</td>
                <td className="centered-cell">
                <p className={`${row['# of Arcade Games Completed'] === '1' ? 'yes-cell' : 'no-cell' }`} > {row['# of Arcade Games Completed']} </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    
    </>
  );
}

export default Leaderboard;