import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/gdg.png";
import "./nav.css";
import { Link } from 'react-router-dom';
import { MoonLoader, PulseLoader } from 'react-spinners';

const Nav = () => {
  const [data, setData] = useState({
    time: "",
    arcade: 0,
    enrolled: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      try {
        const response = await axios.get("ENTER_YOUR_WEB_APP_URL"); // Use your Apps Script Web App URL here
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="nav_container">
        <div className="logo">
          <img src={Logo} alt="Google Developer Groups" />
          {/* change the logo file above in imports with your campus logo */}
        </div>

        <div className="time">
          Last Updated: {data.time || <PulseLoader size={5} /> }
        </div>
      </div>

      {/* <div className="links_container">
        <Link to="/"><p>GenAI & Arcade Leaderboard</p></Link>
        <Link to="/terms"><p>Terms & Conditions</p></Link>
        <Link to="/team"><p>Team GDG On Campus </p></Link>
        <Link to="/contact" ><p>Join Community | Contact us</p></Link>
      </div> */}

      <div className="live">
        GenAI Study Jams & GenAI Arcade is Live !!
      </div>

      <div className="analytics">
        <div className="data_card">
          <div>No of participants enrolled</div>
          <p>{loading ? <MoonLoader size={10} /> : data.enrolled}</p>
        </div>

        <div className="data_card">
          <div>No of participants completed Arcade</div>
          <p>{loading ? <MoonLoader size={10} /> : data.arcade}</p>
        </div>

        <div className="data_card">
          <div>No of participants completed 15 Skill Badges</div>
          <p>{loading ? <MoonLoader size={10} /> : data.completed}</p>
        </div>
      </div>
    </>
  );
};

export default Nav;