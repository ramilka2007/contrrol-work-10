export interface NewsForm {
    title: string,
    text: string
    image: string | null,
}

export interface News {
    id: string,
    title: string,
    text: string
    image: string | null,
    date: string,
}

export interface NewsWithoutText {
    id: string,
    title: string,
    image: string | null,
    date: string,
}