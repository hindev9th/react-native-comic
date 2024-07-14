import {useEffect, useState} from "react";
import requestApi from "@/config/http/request";
import {page, response} from "@/types/response";

export const useFetchPage = (id: string, chapter: number, name: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<string[]>([]);

  const fetchPage = async () => {
    setIsLoading(true);
    try {
      const response = await requestApi.post<response<page>>("/api/chapter/auth",
        `comicId=${id}&chapterNumber=${chapter}&nameEn=${name}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          }
        });
      const result = response.data.result;
      console.log(`comicId=${id}&chapterNumber=${chapter}&nameEn=${name}`)
      setPages(result.data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.error(e);
    }
  }

  useEffect(() => {
    fetchPage()
  }, [chapter]);

  return {isLoading, pages, setPages}
}