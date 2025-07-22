import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof typeof ui[typeof defaultLang]) {
		return (ui[lang] as any)[key] || ui[defaultLang][key];
	};
}

export function getRouteFromUrl(url: URL): string | undefined {
	const pathname = new URL(url).pathname;
	const parts = pathname?.split('/');
	const lang = parts[1];
	if (lang in ui) {
		return parts.slice(2).join('/') || undefined;
	}
	// For the default language, the path starts at the root
	if (pathname === '/') return undefined;
	return pathname.startsWith('/') ? pathname.slice(1) : pathname;
} 