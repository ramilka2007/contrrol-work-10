import React from 'react';
import dayjs from 'dayjs';
import { News } from '../../../types.ts';

interface Props {
  news: News;
}

const FullPostItem: React.FC<Props> = ({ news }) => {
  return (
    <div className="my-5 text-start">
      <h1>{news.title}</h1>
      <p className="text-light-emphasis opacity-50">
        {dayjs(news.date).format('ddd, MMM D, YYYY h:mm A')}
      </p>
      <p>{news.text}</p>

      {news.image ? (
        <img
          src={`http://localhost:8000/${news.image}`}
          alt={news.id}
          className={'h-auto w-25'}
        />
      ) : null}
    </div>
  );
};

export default FullPostItem;
