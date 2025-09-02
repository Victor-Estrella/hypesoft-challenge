"use client"
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        router.replace(`/${e.target.value}`);
    }

    return (
        <select value={locale} onChange={handleChange} className="border rounded px-2 py-1 text-sm">
            <option value="pt">PT</option>
            <option value="en">EN</option>
        </select>
    );
}
