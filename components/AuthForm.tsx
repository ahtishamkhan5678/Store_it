"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import loaderImage from "../public/assets/icons/loader.svg";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type FormType = "sign-in" | "sign-up";

// Schema builder function based on form type
const authFormSchema = (formType: FormType) =>
    z.object({
        email: z.string().email(),
        fullName:
            formType === "sign-up"
                ? z.string().min(2, "Full Name must have at least 2 characters.").max(50, "Full Name can't exceed 50 characters.")
                : z.string().optional(),
    });

const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = authFormSchema(type);

    // Define the form using react-hook-form and zod
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "", // Default value for "sign-up" form
            email: "",
        },
    });

    // Submit handler for the form
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage(""); // Clear previous error
        try {
            console.log("Form submitted with values:", values);
            // Handle successful form submission here
        } catch (error) {
            setErrorMessage("Failed to submit the form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                <h1 className="form-title">
                    {type === "sign-in" ? "Sign In" : "Sign Up"}
                </h1>

                {/* Full Name Field for Sign Up */}
                {type === "sign-up" && (
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form-label">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="Enter your full name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form-label">Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="shad-input"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" className="form-submit-button" disabled={isLoading}>
                    {type === "sign-in" ? "Sign In" : "Sign Up"}
                    {isLoading && (
                        <Image
                            src={loaderImage}
                            alt="Loading..."
                            width={24}
                            height={24}
                            className="ml-2 animate-spin"
                        />
                    )}
                </Button>

                {errorMessage && (
                    <p className="error-message">* {errorMessage}</p>
                )}

                <div className="body-2 flex justify-center">
                    <p className="text-light-100">
                        {type === "sign-in"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </p>
                    <Link
                        className="ml-1 font-medium text-brand"
                        href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                    >
                        {type === "sign-in" ? "Sign Up" : "Sign In"}
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
