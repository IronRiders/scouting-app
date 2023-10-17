import QrCode from "@/components/qr-code.tsx";

export default function Match() {
    return (
        <div className={"m-4"}>
            <QrCode
                value={"based tech stack"}
            />
        </div>
    )
}