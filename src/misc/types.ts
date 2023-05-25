export interface BasePageProps {
    metadata: any;
    htmlContent: any;
}

export interface PagesProps {
    id: string;
    name: string;
    path: string;
    type: string;
    subPages?: PagesProps[];
}

export interface MetaDataProps {
    id: string;
    path: string;
}
