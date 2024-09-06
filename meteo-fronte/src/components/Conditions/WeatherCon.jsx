import './WeatherCon.css';
import React from 'react';
import { FiWind } from 'react-icons/fi';
import { FaCloud } from 'react-icons/fa'
import { MdOutlineWaterDrop } from 'react-icons/md';
import { LiaThermometerThreeQuartersSolid } from 'react-icons/lia';

export default function WeatherDesc({ weather, loading }) {
  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!weather) {
      return <p>No weather data available</p>;
    }

    const { current, location } = weather;

    const DESC_CONTENT = [
      {
        ICON: FiWind,
        color: '#FFFFFF',
        fontSize: '20px',
        text: 'WIND',
        unit: 'Km/h',
        value: current.wind_kph,
      },
      {
        ICON: LiaThermometerThreeQuartersSolid,
        color: '#ED5E56',
        fontSize: '23px',
        text: 'FEELS LIKE',
        value: `${current.feelslike_c}˚`,
      },
      {
        ICON: MdOutlineWaterDrop,
        color: '#32A9E2',
        fontSize: '20px',
        text: 'HUMIDITY',
        unit: '%',
        value: `${current.humidity}%`,
      },
      {
        ICON: FaCloud,
        color: '#FFCC01',
        fontSize: '20px',
        text: 'CLOUD COVER',
        unit: '%',
        value: `${current.cloud}%`,
      },
    ];

    return (
      <div className="Grid-box-1">
        {DESC_CONTENT.map(({ value, unit, text, fontSize, color, ICON }) => (
          <div className="smallBox" key={text}>
            <div className="iconParams">
              <ICON style={{ fontSize, color }} />
              <p>{text}</p>
            </div>
            <div className="val-unit">
              <h1 style={{ fontSize: '3rem', fontWeight: 300 }}>{value}</h1>
              <p>{unit}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}