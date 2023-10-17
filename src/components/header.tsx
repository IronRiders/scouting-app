import {ThemeToggle} from "@/components/theme-toggle.tsx";

export default function Header() {
    return (
        <header className={"w-full h-14 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 border-b bg-background/95 backdrop-blur"}>
            <div className={'container flex h-14 items-center'}>
                <nav className={"flex items-center cursor-pointer"}>
                    <img src={"iron-riders-logo.png"} alt={"Iron Riders"} className={"w-8 h-aut o mr-2"} />
                    <span className={"font-bold"}>Scouting App</span>
                </nav>
                <div className={"flex justify-end flex-1"}>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}