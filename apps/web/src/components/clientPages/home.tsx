"use client"
import {NewsCardGrid, PerformanceSection} from "@repo/ui/organisms";
import {newsItems, performanceStats, performanceStatsSelectOptions} from "../../utils/constants.tsx";
import {FlexGrid} from "@repo/ui/atoms";

export const Home = () => {
  /*const [news, setNews] = useState(newsItems)

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch('https://klayr.xyz/feed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/xml',
          },
        });
        console.log(response)
        /!*if(response) {
          const data = new XMLParser().parseFromString(response.text(),  "text/xml");
          setNews(data);
        }*!/
      } catch (error) {
        console.error(error);
      }
    }
    getNews();
  }, []);*/

  return (
    <FlexGrid className="w-full max-w-app mx-auto" direction={"col"} gap={"4xl"}>
      <PerformanceSection href={"#"} options={performanceStatsSelectOptions} stats={performanceStats} />
      <NewsCardGrid href={"https://klayr.xyz/blog"} newsCards={newsItems} />
    </FlexGrid>
  );
}