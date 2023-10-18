import QRCodeSVG from "react-qr-code";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import SectionTitle from "@/components/section-title.tsx";

export default function QrCode({value} : {value: string}) {
    return (
        <div className={"content-lr-mt"}>
            <SectionTitle title={"QR Code"} description={undefined}/>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className={"w-fit"}>
                        <div className={"rounded-lg border bg-white flex justify-center content-mt"}>
                            <QRCodeSVG
                                className={"m-6"}
                                value={value}
                                size={300}
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>QR Code; Take a screenshot database captain is unable to scan.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}