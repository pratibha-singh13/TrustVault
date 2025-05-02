import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f0f4f8] dark:bg-[#0f172a] px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 401 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10"
            >
                <div className="text-center lg:text-left space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#006d77] dark:text-[#99f6e4] leading-tight">
                        Your Digital Assets. <br />
                        Secured & Simplified.
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-lg max-w-md">
                        TrustVault is your all-in-one solution to store, manage, and protect your valuable digital assets. From credentials to sensitive data, we've got you covered with privacy-first features.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                        <Link
                            to="/signup"
                            className="px-6 py-3 rounded-full text-white bg-[#006d77] hover:bg-[#075e64] transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 rounded-full border border-[#006d77] text-[#006d77] dark:text-[#99f6e4] hover:bg-[#e6fffa] dark:hover:bg-[#134e4a] transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                <div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                        alt="Secure Vault Illustration"
                        className="w-72 h-auto animate-fade-in"
                    />
                </div>
            </motion.div>
        </main>
    );
}
