/*
import XMLParser from 'react-xml-parser';
export const getNews = async () => {
  try {
    const response = await fetch('https://klayr.xyz/feed');
    if(response) {
      const data = new XMLParser().parseFromString(response.text(),  "text/xml");
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}*/

import { nextAPIURL } from '../constants';

const get = async (call: string, params?: any) => {
  const response = await fetch(`${nextAPIURL}${call}`, params);

  return await response.json();
};

const post = async (call: string, data: any) => {
  const response = await fetch(`${nextAPIURL}${call}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const api = {
  get,
  post,
};
