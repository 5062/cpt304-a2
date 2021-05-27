import React, {useMemo} from 'react';
import http from '../core/http';
import useSWR from 'swr';

const fetcher = (url, params) => http.get(url, {
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
  },
  params,
}).then(res => {
  // console.log(res.data);
  return res.data;
});

export default function Weather(props) {
  const params = useMemo(() => ({
    q: props.city,
    days: 3,
  }), [props.city]);
  const {data, error} = useSWR(
      ['https://weatherapi-com.p.rapidapi.com/forecast.json', params], fetcher);

  const title = <h2>Weather in {props.city}</h2>;
  if (error) return <div>{title}failed to load</div>;
  if (!data) return <div>{title}loading...</div>;

  return (
      <div>
        {title}
        <h3>{props.date}</h3>
        <br />
        <div>
          <strong>{data.current.condition.text}</strong>
          <img src={data.current.condition.icon} alt={data.current.condition.text} />
        </div>
        <br />
        Temperature: {data.current.temp_c}&deg;C
        <br />
        Humidity: {data.current.humidity}%
        <br />
        Pressure: {data.current.pressure_mb} mbar
        <br />
        Wind speed: {data.current.wind_kph} kph
        <br />
        Precipitation: {data.current.precip_mm} mm
        <br />
        Cloud: {data.current.cloud}%
      </div>
  );
}
