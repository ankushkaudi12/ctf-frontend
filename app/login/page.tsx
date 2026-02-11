'use client';

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaMicrosoft, FaGithub } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/utils/validation";

import styles from "./page.module.css";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register: login,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    const submit = async (data: LoginFormData) => {
        alert(
            "Username: " + data.username + "\n" +
            "Password: " + data.password
        );
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center ${styles.wrapper}`}
        >

            <div
                className={`bg-card border border-border p-8 w-96 ${styles.box}`}
            >

                <h1
                    className={`text-2xl mb-6 text-center tracking-widest ${styles.title}`}
                >
                    LOGIN
                </h1>

                {/* FORM */}
                <form onSubmit={handleSubmit(submit)} noValidate>

                    {/* USERNAME */}
                    <input
                        {...login("username")}
                        className={`w-full bg-black border p-2 mb-1 outline-none
            ${errors.username ? "border-red-500" : "border-border"}
            focus:ring-1 focus:ring-foreground ${styles.input}`}
                        placeholder="Username"
                    />

                    {errors.username && (
                        <p className="text-red-500 text-xs mb-3">
                            {errors.username.message}
                        </p>
                    )}

                    {/* PASSWORD */}
                    <div className="relative mb-1">

                        <input
                            type={showPassword ? "text" : "password"}
                            {...login("password")}
                            className={`w-full bg-black border p-2 pr-10 outline-none
              ${errors.password ? "border-red-500" : "border-border"}
              focus:ring-1 focus:ring-foreground ${styles.input}`}
                            placeholder="Password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                    </div>

                    {errors.password && (
                        <p className="text-red-500 text-xs mb-4">
                            {errors.password.message}
                        </p>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full border border-foreground py-2 transition
            hover:bg-foreground hover:text-black
            disabled:opacity-50 disabled:cursor-not-allowed
            ${styles.button}`}
                    >
                        {isSubmitting ? "AUTHENTICATING..." : "ACCESS"}
                    </button>

                </form>

                <p className="mt-4 text-center text-sm text-foreground/70">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-foreground hover:underline hover:text-green-400 transition"
                    >
                        <strong>Register Now</strong>
                    </Link>
                </p>

                {/* DIVIDER */}
                <div className="flex items-center my-5">
                    <div className="flex-grow h-px bg-border"></div>
                    <span className="px-3 text-sm text-foreground/60">OR</span>
                    <div className="flex-grow h-px bg-border"></div>
                </div>

                {/* CONTINUE WITH */}
                <div className="flex justify-center my-5">
                    <span className="text-sm text-foreground/60 tracking-widest">
                        Continue with
                    </span>
                </div>

                {/* SOCIAL */}
                <div className="flex justify-center gap-6">

                    {/* Google */}
                    <button
                        className="p-3 border border-border rounded-sm
            transition-all duration-200
            hover:bg-[#00ff41] hover:text-black
            hover:shadow-[0_0_10px_#00ff41]
            cursor-pointer"
                        onClick={() => alert("Continue with Google")}
                        aria-label="Continue with Google"
                    >
                        <FaGoogle size={20} />
                    </button>

                    {/* Microsoft */}
                    <button
                        className="p-3 border border-border rounded-sm
            transition-all duration-200
            hover:bg-[#00ff41] hover:text-black
            hover:shadow-[0_0_10px_#00ff41]
            cursor-pointer"
                        onClick={() => alert("Continue with Microsoft")}
                        aria-label="Continue with Microsoft"
                    >
                        <FaMicrosoft size={20} />
                    </button>

                    {/* GitHub */}
                    <button
                        className="p-3 border border-border rounded-sm
            transition-all duration-200
            hover:bg-[#00ff41] hover:text-black
            hover:shadow-[0_0_10px_#00ff41]
            cursor-pointer"
                        onClick={() => alert("Continue with GitHub")}
                        aria-label="Continue with GitHub"
                    >
                        <FaGithub size={20} />
                    </button>

                </div>

            </div>

        </div>
    );
}
