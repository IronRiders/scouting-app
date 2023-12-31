import {Separator} from "@/components/ui/separator.tsx";

export default function SectionTitle({title, description} : {title: string, description?: string | undefined}) {
    return (
        <div className={"content-mt"}>
            <h1>{title}</h1>
            {description == undefined ? <></> : <p className={"text-muted-foreground mt-1"}>{description}</p>}
            <Separator className={"mt-1.5"} />
        </div>
    )
}