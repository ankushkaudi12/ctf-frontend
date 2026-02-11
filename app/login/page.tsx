'use client';

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaMicrosoft, FaGithub } from "react-icons/fa";

// import css
import styles from "./page.module.css";

export default function Login() {
    // Form fields state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Other state variables
    const [showPassword, setShowPassword] = useState(false);

    const submit = async () => {
        // const response = await fetch(`http://localhost:8080/api/login`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ username, password }),
        // })

        alert("Login Successful! \nUsername: " + username + "\nPassword: " + password);
    }

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

                <input
                    className={`w-full bg-black border border-border p-2 mb-4 outline-none focus:ring-1 focus:ring-foreground ${styles.input}`}
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                />

                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full bg-black border border-border p-2 pr-10 outline-none focus:ring-1 focus:ring-foreground ${styles.input}`}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
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

                <button
                    className={`w-full border border-foreground py-2 hover:bg-foreground hover:text-black transition ${styles.button}`}
                    onClick={submit}
                >
                    ACCESS
                </button>

                <p className="mt-4 text-center text-sm text-foreground/70">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-foreground hover:underline hover:text-green-400 transition"
                    >
                        <strong>Register Now</strong>
                    </Link>
                </p>

                <div className="flex items-center my-5">
                    <div className="flex-grow h-px bg-border"></div>
                    <span className="px-3 text-sm text-foreground/60">OR</span>
                    <div className="flex-grow h-px bg-border"></div>
                </div>

                <div className="flex justify-center my-5">
                    <span className="text-sm text-foreground/60 tracking-widest">
                        Continue with
                    </span>
                </div>

                <div className="flex justify-center gap-6">

                    {/* Google */}
                    <button
                        className="p-3 border border-border rounded-full 
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
                        className="p-3 border border-border rounded-full 
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
                        className="p-3 border border-border rounded-full 
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