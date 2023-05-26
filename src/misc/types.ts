export interface PagesProps {
    id: string;
    name: string;
    path: string;
    type: string;
    subPages?: PagesProps[];
    showMenu?: boolean;
}

export interface MetaDataProps {
    id: string;
    path?: string;
    title?: string;
    name?: string;
    date?: string;
    promotion?: string;
    expertise?: string;
    authors?: string[];
    showSubPosts?: boolean;
    subPostList?: { path: string; name: string; }[];
}
