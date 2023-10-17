import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SectionTitle from "@/components/SectionTitle.tsx";

const formSchema = z.object({
    teamNumber: z.coerce.number()
        .min(0, "Must be a valid FRC team number.")
        .max(9999, "Must be a valid FRC team number."),
    teamName: z.string()
        .min(2, "Team name too short.")
        .max(50, "Team name too long."),
    rookieYear: z.coerce.number()
        .min(1992, "Must be after FRC was founded.")
        .max((new Date()).getFullYear(), "Can not be in the future.")
})

export default function Pit() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <SectionTitle title={"Interview Information"} description={undefined} />
            <SectionTitle title={"Team Information"} description={undefined} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                    {...field}
                                />
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
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rookieYear"
                    render={({ field }) => (
                        <FormItem className={"content-mt"}>
                            <FormLabel>Rookie Year</FormLabel>
                            <FormControl>
                                <Input
                                    className={"remove-arrow limit-width"}
                                    placeholder="2012"
                                    type={"number"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"content-mt"}>Generate QR Code</Button>
                <Button className={"ml-2"} variant={"link"}>Clear form</Button>
            </form>
        </Form>
    )
}
