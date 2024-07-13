export type requestComic = {
  p: number,
  value: string,
  extraData?: string
}

export type requestSearch = {
  p: number,
  searchValue: string,
}

export type requestChapter = {
  offset: number,
  limit: number,
}