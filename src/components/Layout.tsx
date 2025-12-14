import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
            <main className="w-full max-w-5xl flex flex-col items-center gap-8">
                <header className="text-center space-y-2 mb-4 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img src="/logo.png" alt="Easy Join Wi-Fi Logo" className="relative w-24 h-24 rounded-2xl shadow-2xl mb-2 object-cover" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 tracking-tight drop-shadow-sm">
                        Easy Join Wi-Fi
                    </h1>
                    <p className="text-blue-200/80 text-lg font-medium">
                        Share your Wi-Fi instantly with a secure QR code.
                    </p>
                </header>

                {children}

                <footer className="mt-12 text-blue-200/40 text-sm font-medium print:hidden">
                    <p>Secure. Private. Client-side only.</p>
                </footer>
            </main>
        </div>
    );
}
