import React, {useMemo} from 'react';
import http from '../core/http';
import useSWR from 'swr';

const fetcher = (url, params) => http.get(url, {
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
  },
  params,
}).then(res => {
  // console.log(res.data);
  return res.data;
});

export default function HolidayList(props) {
  const params = useMemo(() => ({
    query: props.city,
  }), [props.city]);
  const {data, error} = useSWR(
      ['https://travel-advisor.p.rapidapi.com/locations/search', params], fetcher);

  const title = <h2>Hotels in {props.city}</h2>;
  if (error) return <div>{title}failed to load</div>;
  if (!data) return <div>{title}loading...</div>;

  const hotels = data.data.filter(item => item.result_type === 'lodging');

  return (
      <div>
        {title}
        <h3>{props.date}</h3>
        {hotels.map(item =>
            <div>
              {item.result_object.name}
            </div>,
        )}
      </div>
  );
}
