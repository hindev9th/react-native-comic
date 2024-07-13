import {useEffect, useState} from "react";
import requestApi from "@/config/http/request";
import {chapter, response, responseChapter} from "@/types/response";

export const useFetchChapters = (id: string, page: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [isNext, setIsNext] = useState(true);

  const fetchChapters = async () => {
    setIsLoading(true);
    try {
      const response = await requestApi.get<response<responseChapter>>(`/api/comic/${id}/chapter?offset=${page > 0 ? page * 21 : 0}&limit=21`);
      const result = response.data.result;
      if (result.chapters.length == 21) {
        setIsNext(true)
      } else {
        setIsNext(false)
      }
      setChapters(prevState => prevState.concat(result.chapters));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchChapters();
  }, [page, id]);

  return {chapters, isLoading, isNext};
}