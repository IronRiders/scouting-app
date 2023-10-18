export default function Footer() {
    return (
        <footer className={"border-t"}>
            <p className={"container my-8 text-muted-foreground text-sm"}>
                Build by <a className={"link"} href={"https://ampersanded.dev/"}>
                    Salvo Bonsma
                </a>
                . Design inspired by <a className={"link"} href={"https://ui.shadcn.com/"}>
                    shadcn/ui
                </a>
                .
            </p>
        </footer>
    )
}