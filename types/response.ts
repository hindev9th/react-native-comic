export type response<T> = {
  status: boolean,
  code: number,
  result: T
}

export type responseComic = {
  p: number;
  limit: number;
  next: boolean;
  data: comic[];
}

export type responseChapter = {
  limit: number,
  chapters: chapter[]
}

export type comic = {
  id: string;
  name: string;
  description: string;
  otherName: string;
  statusCode: string;
  photo: string;
  nameEn: string;
  display: boolean;
  author: string;
  novelId: string;
  chapterLatest: string[];
  chapterLatestId: string[];
  chapterLatestDate: string[];
  chapterState: string[];
  category: null;
  categoryCode: null;
  createDate: string;
  updateDate: string;
  note: null;
  followerCount: string;
  viewCount: string;
  evaluationScore: number;
}

export type chapter = {
  id: string;
  name: string;
  comicName: null;
  comicOtherName: null;
  limit: null;
  comicId: string;
  type: string;
  viewCount: number;
  numberChapter: string;
  translationTeam: string;
  updateTime: number;
  stringUpdateTime: string;
  rangeBlock: number;
  randomCode: null;
  randomPosition: null;
  display: boolean;
  ajax: boolean;
  cdn: boolean;
  video: boolean;
  urlVideo: null;
  serversName: null;
}

export type page = {
  state: boolean;
  block: boolean;
  data: string[];
  message: null;
}


