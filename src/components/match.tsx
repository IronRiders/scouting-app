import SectionTitle from "@/components/section-title.tsx";
import * as z from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    matchNumber: z.coerce.number()
        .int("Match number must be a whole number.")
        .min(1)
        .max(60),
    teamNumber: z.coerce.number()
        .int("Team number must be a whole number.")
        .min(0, "Must be a valid FRC team number.")
        .max(99999, "Must be a valid FRC team number."),
    teamAlliance: z.string(),
    idempotencyKey: z.string().optional()
})

export default function Match() {
    const [qrCodeValue, setQrCodeValue]
        = useState<string | undefined>(undefined)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamAlliance: "blue",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setQrCodeValue("m" + JSON.stringify(values))
    }

    function handleReset() {
        setQrCodeValue(undefined)
        form.reset({
            matchNumber: NaN,
            teamNumber: NaN,
            teamAlliance: ""
        })
        form.clearErrors()
    }

    return (
        <>
            <SectionTitle title={"Match Information"} />
            <SectionTitle title={"Team Information"} />
        </>
    )
}