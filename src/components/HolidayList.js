import React from 'react';
import http from '../core/http';
import useSWR from 'swr';

const fetcher = (url, params) => http.get(url, {
  headers: {
    'x-rapidapi-host': 'public-holiday.p.rapidapi.com',
  },
  params,
}).then(res => {
  // console.log(res.data);
  return res.data;
});

export default function HolidayList(props) {
  const {data, error} = useSWR(
      `https://public-holiday.p.rapidapi.com/${props.year}/${props.countryCode}`, fetcher);

  const title = <h2>Public holidays in {props.countryName} in {props.year}</h2>;
  if (error) return <div>{title}failed to load</div>;
  if (!data) return <div>{title}loading...</div>;

  return (
      <div>
        {title}
        <ul>
          {data.map((item, index) =>
              <li key={index}>
                <a href="#" onClick={() => props.onSelectItem(item.date)}>
                  {item.date}: {item.localName}
                  {item.localName !== item.name && ` (${item.name})`}
                </a>
              </li>,
          )}
        </ul>
      </div>
  );
}
