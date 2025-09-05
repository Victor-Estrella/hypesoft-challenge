"use client";
import { NextIntlClientProvider } from "next-intl";
import ptMessages from '../../messages/pt.json';
import enMessages from '../../messages/en.json';
import { useParams } from "next/navigation";

export default function I18nProvider({ children, timeZone }: { children: React.ReactNode, timeZone?: string }) {
    const params = useParams();
    const locale = typeof params.locale === "string" ? params.locale : Array.isArray(params.locale) ? params.locale[0] : "pt";
    const messages = locale === 'en' ? enMessages : ptMessages;
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
            {children}
        </NextIntlClientProvider>
    );
}
