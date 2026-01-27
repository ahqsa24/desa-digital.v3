"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import idMessages from '../../messages/id.json';
import enMessages from '../../messages/en.json';

type Locale = 'id' | 'en';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('id');
    const [messages, setMessages] = useState<any>(idMessages);

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
            setLocaleState(savedLocale);
            setMessages(savedLocale === 'en' ? enMessages : idMessages);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        setMessages(newLocale === 'en' ? enMessages : idMessages);
        localStorage.setItem('locale', newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
                {children}
            </NextIntlClientProvider>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
