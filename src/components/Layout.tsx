import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 pb-24">
            <main className="w-full max-w-5xl flex flex-col items-center gap-8">
                <header className="text-center space-y-2 mb-4 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img src="/logo.png" alt="Easy Join Wi-Fi Logo" className="relative w-20 h-20 rounded-2xl shadow-2xl mb-2 object-cover" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 tracking-tight drop-shadow-sm">
                        Easy Join Wi-Fi
                    </h1>
                    <p className="text-blue-200/80 text-lg font-medium">
                        Share your Wi-Fi instantly with a secure QR code.
                    </p>
                </header>

                {children}

            </main>

            <footer className="fixed bottom-0 left-0 w-full p-2 text-center text-blue-200/60 text-sm font-medium backdrop-blur-md bg-indigo-950/30 border-t border-white/5 shadow-2xl print:hidden">
                <p>Secure. Private. Client-side only.</p>
            </footer>
        </div>
    );
}
