import type { Metadata } from "next";
import "@copilotkit/react-ui/styles.css";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import { Noto_Serif, Lato } from "next/font/google";
import { ResearchProvider } from "@/components/research-context";
import { TooltipProvider } from "@/components/ui/tooltip";

const lato = Lato({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
    weight: ['300', '400', '700']
})

const noto = Noto_Serif({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto'
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${lato.variable} ${noto.className} antialiased h-full`}>
                <CopilotKit runtimeUrl="/api/copilotkit" showDevConsole={false} agent="agent">
                    <TooltipProvider>
                        <ResearchProvider>
                            {children}
                        </ResearchProvider>
                    </TooltipProvider>
                </CopilotKit>
            </body>
        </html>
    );
}
