import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import StoreProvider from '@/components/StoreProvider';
import Header from '@/components/ui/Header';
import MainContainer from '@/components/MainContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Temirlan\'s shop',
    description: '',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>
            <Header />
            <MainContainer children={children} />
        </StoreProvider>
        </body>
        </html>

    );
}
