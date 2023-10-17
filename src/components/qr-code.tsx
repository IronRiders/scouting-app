import QRCodeSVG from "react-qr-code";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function QrCode() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className={"rounded-lg border bg-white w-fit flex justify-center"}>
                        <QRCodeSVG
                            className={"m-6"}
                            value={"based tech stack (next.js better tho)"}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>QR Code; Take a screenshot database captain is unable to scan.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}