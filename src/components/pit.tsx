import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SectionTitle from "@/components/section-title.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import QrCode from "@/components/qr-code.tsx";
import {useState} from "react";

const formSchema = z.object({
    interviewer: z.string()
        .min(2, "Interviewer name is too short.")
        .max(50, "Interviewer name is too long."),
    interviewee: z.string()
        .min(2, "Interviewee name is too short.")
        .max(50, "Interviewee name is too long."),
    teamNumber: z.coerce.number()
        .min(0, "Must be a valid FRC team number.")
        .max(99999, "Must be a valid FRC team number."),
    teamName: z.string()
        .min(2, "Team name too short.")
        .max(50, "Team name too long."),
    rookieYear: z.coerce.number()
        .min(1992, "Must be after FRC was founded.")
        .max((new Date()).getFullYear(), "Can not be in the future."),
    driveBase: z.string(),
})

export default function Pit() {
    const [qrCodeValue, setQrCodeValue] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            driveBase: "swerve"
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setQrCodeValue("p" + JSON.stringify(values))
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <SectionTitle title={"Interview Information"} description={undefined}/>
                    <FormField
                        control={form.control}
                        name="interviewer"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Interviewer</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"limit-width"}
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="interviewee"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Interviewee</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"limit-width"}
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                    <SectionTitle title={"Team Information"} description={undefined}/>
                    <FormField
                        control={form.control}
                        name="teamNumber"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Team Number</FormLabel><FormControl>
                                <Input
                                    className={"remove-arrow limit-width"}
                                    placeholder="4180"
                                    type={"number"}
                                    {...field} />
                            </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="teamName"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Team Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"limit-width"}
                                        placeholder="Iron Riders"
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <FormField
                        control={form.control}
                        name="rookieYear"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Rookie Year</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"remove-arrow limit-width"}
                                        placeholder="2012"
                                        type={"number"}
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                    <SectionTitle title={"Robot Information"} description={undefined}/>
                    <FormField
                        control={form.control}
                        name="driveBase"
                        render={({field}) => (
                            <FormItem className={"content-mt w-fit"}>
                                <FormLabel>Drive Base</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className={"mr-2"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a drive base"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="swerve">Swerve</SelectItem>
                                        <SelectItem value="tank">Tank</SelectItem>
                                        <SelectItem value="mecanum">Mecanum</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                    <div className={"content-lr-mt"}>
                        <Button type="submit">Generate QR Code</Button>
                        <Button className={"ml-2"} type={"reset"} variant={"link"}>Clear form</Button>
                    </div>
                </form>
            </Form>
            <QrCode value={qrCodeValue} />
        </>
    )
}
