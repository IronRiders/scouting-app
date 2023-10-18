import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SectionTitle from "@/components/section-title.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import QrCode from "@/components/qr-code.tsx";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

const formSchema = z.object({
    interviewer: z.string()
        .min(2, "Interviewer name is too short.")
        .max(50, "Interviewer name is too long."),
    interviewee: z.string()
        .min(2, "Interviewee name is too short.")
        .max(50, "Interviewee name is too long.")
        .optional(),
    teamNumber: z.coerce.number()
        .int("Team number must be a whole number.")
        .min(0, "Team number must be a valid FRC team number.")
        .max(99999, "Team number must be a valid FRC team number."),
    teamName: z.string()
        .min(2, "Team name too short.")
        .max(50, "Team name too long."),
    rookieYear: z.coerce.number()
        .int("Rookie year must be a whole number.")
        .min(1992, "Rookie year must be after FRC was founded.")
        .max((new Date()).getFullYear(), "Rookie year can't be in the future.")
        .optional(),
    driveBase: z.string(),
    additionalNotes: z.string()
        .min(2)
        .max(500)
        .optional(),
    idempotencyKey: z.string().optional()
})

const defaultValues = {
    interviewer: "",
    interviewee: "",
    teamNumber: NaN,
    teamName: "",
    rookieYear: NaN,
    driveBase: "swerve",
    additionalNotes: ""
}

export default function Pit() {
    const [qrCodeValue, setQrCodeValue]
        = useState<string | undefined>(undefined)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        values.idempotencyKey = (+new Date * Math.random()).toString(36).substring(0,10)
        console.log(values)
        setQrCodeValue("p" + JSON.stringify(values))
    }

    function handleReset() {
        setQrCodeValue(undefined)
        form.reset(defaultValues)
        form.clearErrors()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <SectionTitle title={"Interview Information"}/>
                    <FormField
                        control={form.control}
                        name="interviewer"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Interviewer</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"limit-width"}
                                        placeholder={"Salvo Bonsma"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="interviewee"
                        render={({field}) => (
                            <FormItem className={"content-mt"}>
                                <FormLabel>Interviewee</FormLabel>
                                <FormControl>
                                    <Input
                                        className={"limit-width"}
                                        placeholder={"Gus Self"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <SectionTitle title={"Team Information"}/>
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
                                    pattern="[0-9]*"
                                    inputMode={"numeric"}
                                    {...field} />
                            </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                        )}
                    />
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
                                        pattern="[0-9]*"
                                        inputMode={"numeric"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <SectionTitle title={"Robot Information"}/>
                    <FormField
                        control={form.control}
                        name="driveBase"
                        render={({field}) => (
                            <FormItem className={"content-mt w-fit"}>
                                <FormLabel>Drive Base</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    {...field}
                                >
                                    <FormControl className={"mr-2"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a drive base"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="swerve">Swerve</SelectItem>
                                        <SelectItem value="tank">Tank</SelectItem>
                                        <SelectItem value="mecanum">Mecanum</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({field}) => (
                            <FormItem className={"content-mt w-full xl:w-1/2"}>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl className={"mr-2"}>
                                    <Textarea
                                        placeholder={"Their robot is have troubles with its manipulator."}
                                        className={"limit-width h-24"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Please only enter relevant information!</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"content-lr-mt"}>
                        <Button type="submit">Generate QR Code</Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className={"ml-2"}
                                    type={"button"}
                                    variant={"link"}
                                >Clear form</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will clear the entire form!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleReset}>Clear</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>
                <QrCode value={qrCodeValue} />
            </Form>
        </>
    )
}
