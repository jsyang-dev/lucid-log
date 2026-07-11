// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Lucid Log';
export const SITE_DESCRIPTION = '개발·여행·지식을 선명하게 남기는 기록';

// Prefix a path with the configured `base` (e.g. `/cmds-blog`) so internal
// links stay correct on GitHub Pages. Never hardcode the base elsewhere.
export function withBase(path = '/') {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const clean = path.startsWith('/') ? path : `/${path}`;
	return `${base}${clean}` || '/';
}

// URL-safe slug for a tag (used for /tags/<slug>/ routes).
export function tagSlug(tag = '') {
	return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

interface HasTags {
	data: { tags?: string[] };
}
export interface TagCount {
	tag: string;
	slug: string;
	count: number;
}

// Aggregate tags across posts → [{ tag, slug, count }], sorted by count desc.
export function collectTags(posts: HasTags[]): TagCount[] {
	const map = new Map<string, TagCount>();
	for (const post of posts) {
		for (const raw of post.data.tags ?? []) {
			const slug = tagSlug(raw);
			if (!slug) continue;
			const entry = map.get(slug) ?? { tag: raw, slug, count: 0 };
			entry.count += 1;
			map.set(slug, entry);
		}
	}
	return [...map.values()].sort(
		(a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'),
	);
}
