import {FC } from "react";
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import "./Header.scss"
import {buildMenuTree, DropdownMenuItem} from "../../../features/MenuItem/ui/MenuItem.tsx";
import {Logo} from "../../../shared/components/SVG/Logo/Logo.tsx";



export const Header: FC = () => {
    const config = useConfig()

    return (
        <>
            <div className="menu-container">
                <Logo />
                {config?.context?.headerContext &&
                    buildMenuTree(config?.context?.headerContext).map((item: any) => (
                        <DropdownMenuItem key={item.id} item={item} />
                    ))
                }
            </div>
        </>
    )
}



