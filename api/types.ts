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
