"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const emailPasswordSchema = z.object({
    email: z.string()
        .email({ message: "Please enter a valid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

type EmailPasswordFormValues = z.infer<typeof emailPasswordSchema>;

interface EmailPasswordStepProps {
    onSubmit: (email: string, password: string) => void;
    onBack: () => void;
}

export default function EmailPasswordStep({ onSubmit, onBack }: EmailPasswordStepProps) {
    const form = useForm<EmailPasswordFormValues>({
        resolver: zodResolver(emailPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const handleSubmit = (data: EmailPasswordFormValues) => {
        onSubmit(data.email, data.password);
    };

    return (
        <div>
            <div className="flex justify-end mb-8">
                <Link href="/sign-in">
                    <Button variant="outline" size="sm">
                        Sign in
                    </Button>
                </Link>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200">


                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-2xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground">
                        Enter your email and create a password
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            className="h-12"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Create a password"
                                            {...field}
                                            className="h-12"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-1/3 h-12"
                                onClick={onBack}
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"
                                className="w-2/3 h-12 bg-[#008D3E] text-white hover:bg-[#008D3E]/90"
                                disabled={!form.formState.isValid}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}