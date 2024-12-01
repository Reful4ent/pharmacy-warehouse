export type Permission = {
    id: number;
    user_id: number;
    menu_item_id: number;
    read_permission: boolean;
    write_permission: boolean;
    edit_permission: boolean;
    delete_permission: boolean;
}
