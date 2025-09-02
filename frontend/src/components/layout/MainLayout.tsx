import React from "react";
import { LayoutProps } from "@/types/LayoutProps";


export function MainLayout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">  
            <main className="max-w-6xl mx-auto py-10 px-4">
                {children}
            </main>
        </div>
    );
}
