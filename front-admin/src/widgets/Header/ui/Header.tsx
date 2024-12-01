import {FC } from "react";
import {useConfig} from "../../../app/context/ConfigProvider/context.ts";
import "./Header.scss"
import {buildMenuTree, DropdownMenuItem} from "../../../features/MenuItem/ui/MenuItem.tsx";
import {Logo} from "../../../shared/components/SVG/Logo/Logo.tsx";
import {SignOutButton} from "../../../features/SignOutButton/SignOutButton.tsx";



export const Header: FC = () => {
    const config = useConfig()

    return (
        <>
            <div className="menu-container">
                <div className="menu">
                    <Logo fill={"#ffffff"}/>
                    {config?.config?.headerContext &&
                        buildMenuTree(config?.config?.headerContext).map((item: any) => (
                            <DropdownMenuItem key={item.id} item={item} />
                        ))
                    }
                </div>
                <SignOutButton/>
            </div>
        </>
    )
}



