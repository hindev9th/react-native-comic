import requestApi from "@/config/http/request";
import { comic, response, responseComic } from "@/types/response";
import { useEffect, useState } from "react";

export default function useFetchComics({ page }: { page: number }) {
  const [comics, setComics] = useState<comic[]>([]);
  const [isNext, setIsNext] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true)
    try {
      const response = await requestApi.get<response<responseComic>>(`/api/v2/home/filter?p=${page}&value=all&extraData=`)
      const result = response.data.result;
      setIsNext(result.next)
      if (page === 0 ){
        setComics(result.data);
      }else {
        setComics(prevState => prevState.concat(result.data));
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch();
  }, [page])

  return { comics, loading, isNext, fetch }
}