// Signup.jsx or SignIn.jsx
import React from 'react';

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md text-gray-900 dark:text-gray-100">
                <h2 className="text-3xl font-semibold mb-6 text-center">Create an Account</h2>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
