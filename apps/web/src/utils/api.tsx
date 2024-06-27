/*
import XMLParser from 'react-xml-parser';
export const getNews = async () => {
  try {
    const response = await fetch('https://klayr.xyz/feed');
    console.log(response)
    if(response) {
      const data = new XMLParser().parseFromString(response.text(),  "text/xml");
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}*/
