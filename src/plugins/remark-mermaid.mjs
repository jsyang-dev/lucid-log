/**
 * remark-mermaid — convert ```mermaid code fences into a raw
 * `<pre class="mermaid">…</pre>` block *before* Astro's Shiki syntax
 * highlighting runs, so the diagram source survives untouched and can be
 * rendered client-side by mermaid.js (see BlogPost.astro).
 *
 * No external deps: walks the mdast tree manually so it works on a clean
 * install (avoids relying on a hoisted transitive `unist-util-visit`).
 */

function escapeHtml(s) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function walk(node) {
	if (!node || !Array.isArray(node.children)) return;
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (child && child.type === 'code' && child.lang === 'mermaid') {
			// mermaid.js reads the element's textContent, so escaped entities
			// decode back to the original diagram source in the browser.
			node.children[i] = {
				type: 'html',
				value: `<pre class="mermaid" role="img">${escapeHtml(child.value ?? '')}</pre>`,
			};
		} else {
			walk(child);
		}
	}
}

export default function remarkMermaid() {
	return (tree) => {
		walk(tree);
	};
}
