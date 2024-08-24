export interface New {
    id: string,
    title: string,
    text: string
    image: string | null,
    date: string,
}

export interface NewMutation {
    title: string,
    text: string
    image: string | null,
}

export interface Comment {
    id: string,
    news_id: string;
    author: string;
    comment: string;
}

export interface CommentMutation {
    news_id: string;
    author: string;
    comment: string;
}