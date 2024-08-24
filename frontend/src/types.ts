export interface NewsForm {
  title: string;
  text: string;
  image: string | null;
}

export interface News {
  id: string;
  title: string;
  text: string;
  image: string | null;
  date: string;
}

export interface NewsWithoutText {
  id: string;
  title: string;
  image: string | null;
  date: string;
}

export interface CommentForm {
  news_id: string;
  author: string;
  comment: string;
}

export interface Comment {
  id: string;
  news_id: string;
  author: string;
  text: string;
}
