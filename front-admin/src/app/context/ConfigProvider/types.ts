
export type HeaderMenuItem = {
    id: number;
    parent_id: number;
    name: string;
    dll_name: string;
    function: string;
    sort_order: number;
    children: HeaderMenuItem[] | null | undefined;
}

export interface IContext {
    headerContext: HeaderMenuItem[] | null;
}

export interface IConfigContextValue {
    context: IContext | null;
}