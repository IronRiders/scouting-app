import QRCodeSVG from "react-qr-code";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import SectionTitle from "@/components/section-title.tsx";

export default function QrCode({value} : {value?: string | undefined}) {
    if (value == undefined) { return (<></>) }
    return (
        <div className={"content-lr-mt"}>
            <SectionTitle title={"QR Code"} description={"Take a screenshot if the database captain is unable to scan."}/>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className={"w-fit"}>
                        <div className={"rounded-lg border bg-white flex justify-center content-mt"}>
                            <QRCodeSVG
                                className={"m-6 w-[500px] max-w-full h-full"}
                                value={value}
                                size={4086}
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>QR Code</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}