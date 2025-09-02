import { NextIntlClientProvider } from 'next-intl';
import pt from '../../messages/pt.json';
import en from '../../messages/en.json';

export function I18nProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
    const messages = locale === 'en' ? en : pt;
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
    );
}
