// navigationTypes.ts
import {comic} from "@/types/response";

export type RootStackParamList = {
  home: undefined; // No params expected
  details: { comic: string }; // Params expected for Details screen
  pages: {id : string, chapterNumber : number, name : string}
  NotFound: undefined; // No params expected for NotFound screen
};
