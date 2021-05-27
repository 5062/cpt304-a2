import {useCallback, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Weather from './components/Weather';
import HolidayList from './components/HolidayList';
import Home from './components/Home';
import HotelList from './components/HotelList';
import './style/App.css';
import countries from './countries.json';

export default function App() {
  const [countryCode, setCountryCode] = useState('CA');
  const [city, setCity] = useState('Toronto');
  const [date, setDate] = useState('');

  const handleCountryChange = useCallback((ev) => {
    const newCountryCode = ev.target.value;
    setCountryCode(newCountryCode);
    setCity(countries[newCountryCode].cities[0]);
  }, []);

  return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/holidays">Public holidays</Link></li>
              <li><Link to="/weather">Weather</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
            </ul>
          </nav>

          <div className="select-country">
            <label htmlFor="countries">Select a country: </label>
            <select value={countryCode} onChange={handleCountryChange}>
              {Object.keys(countries).map((item, index) =>
                  <option key={index} value={item}>{countries[item].name}</option>,
              )}
            </select>
          </div>
          <br />

          <div className="select-city">
            <label htmlFor="cities">Select a city: </label>
            <select value={city} onChange={ev => setCity(ev.target.value)}>
              {countries[countryCode].cities.map((item, index) =>
                  <option key={index} value={item}>{item}</option>,
              )}
            </select>
          </div>


          <Switch>
            <Route path="/holidays">
              <HolidayList countryCode={countryCode} countryName={countries[countryCode].name}
                           year={new Date().getFullYear()}
                           onSelectItem={(date) => setDate(date)} />
              <Weather city={city} date={date} />
              <HotelList city={city} date={date} />
            </Route>
            <Route path="/weather">
              <Weather country={countries[countryCode].name} city={city} />
            </Route>
            <Route path="/hotels">
              <HotelList city={city} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

        </div>
      </Router>
  );
}
