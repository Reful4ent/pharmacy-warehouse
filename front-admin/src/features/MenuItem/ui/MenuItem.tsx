import {FC, useState} from "react";
import {HeaderMenuItem} from "../../../app/context/ConfigProvider/types.ts";
import "./MenuItem.scss"
import {urlPage} from "../../../shared/api/route.ts";
import {CaretDown} from "../../../shared/components/SVG/CaretDown/CaretDown.tsx";

interface MenuItemProps {
    item: HeaderMenuItem
}

export const buildMenuTree = (menu: any, parentId = 0) => {
    return menu
        .filter((item: HeaderMenuItem) => item.parent_id === parentId)
        .sort((a: HeaderMenuItem, b: HeaderMenuItem) => a.sort_order - b.sort_order)
        .map((item: HeaderMenuItem) => ({
            ...item,
            children: buildMenuTree(menu, item.id)
        }));
};


export const DropdownMenuItem: FC<MenuItemProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            { item.children &&
            item.children?.length > 0 ?
                (
                    <div className="dropdown-item"
                         onMouseEnter={toggleDropdown}
                         onMouseLeave={toggleDropdown}>
                        <a className="dropdown-item__link submenu">
                            {item.name}
                            <CaretDown />
                        </a>
                        {isOpen && item.children.length > 0 && (
                            <div className="dropdown-menu">
                                {item.children.map((child: any) => (
                                    <DropdownMenuItem key={child.id} item={child} />
                                ))}
                            </div>
                        )}
                    </div>

                )
                :
                (item.function ?
                        <a className="dropdown-item__link" href={urlPage + item.function}>
                            {item.name}
                        </a>
                        :
                        <a className="dropdown-item__link" href="#">
                            {item.name}
                        </a>
                )
            }
        </>
    );
};