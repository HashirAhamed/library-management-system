import { useState } from "react";
import { User, Lock, UserPlus, LogIn, Type } from "lucide-react";
import { loginUser, registerUser } from "../services/loginApi";

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLoginMode) {

                const token = await loginUser({
                    username: formData.username,
                    password: formData.password
                });


                localStorage.setItem("authToken", token);
                onLoginSuccess();
            } else {

                await registerUser({
                    username: formData.username,
                    password: formData.password,
                    name: formData.name
                });

                alert("Registration successful! Please login.");
                setIsLoginMode(true);
                setFormData(prev => ({ ...prev, password: "" }));
            }

        } catch (err: any) {
            const errorMessage = err.response?.data || "Authentication failed";
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        {isLoginMode ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-slate-500">
                        {isLoginMode ? "Enter your credentials to access the library" : "Register as a new administrator"}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {!isLoginMode && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    required={!isLoginMode}
                                    placeholder="Enter Name"
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                required
                                placeholder="admin_user"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            "Processing..."
                        ) : isLoginMode ? (
                            <>
                                <LogIn className="w-5 h-5" /> Login
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" /> Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-600 text-sm">
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setError("");
                                setFormData({ username: "", password: "", name: "" });
                            }}
                            className="text-blue-700 font-bold hover:underline"
                        >
                            {isLoginMode ? "Register here" : "Login here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}