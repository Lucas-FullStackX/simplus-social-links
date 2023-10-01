import type { Action } from 'svelte/action';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { LINK_TYPE } from './components/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export async function copyText(text: string) {
	if ('clipboard' in navigator) {
		await navigator.clipboard.writeText(text);
	} else {
		/**
		 * This is the fallback deprecated way of copying text to the clipboard. Only runs if it can't find the clipboard API.
		 */
		const element = document.createElement('input');

		element.type = 'text';
		element.disabled = true;

		element.style.setProperty('position', 'fixed');
		element.style.setProperty('z-index', '-100');
		element.style.setProperty('pointer-events', 'none');
		element.style.setProperty('opacity', '0');

		element.value = text;

		document.body.appendChild(element);

		element.click();
		element.select();
		document.execCommand('copy');

		document.body.removeChild(element);
	}
}

interface Parameters {
	text: string;
	events?: string | string[];
}

interface Attributes {
	'on:svelte-copy': (event: CustomEvent<string>) => void;
	'on:svelte-copy:error': (event: CustomEvent<Error>) => void;
}

export const copy: Action<HTMLElement, Parameters | string, Attributes> = (element, params) => {
	async function handle() {
		if (text)
			try {
				await copyText(text);

				element.dispatchEvent(new CustomEvent('svelte-copy', { detail: text }));
			} catch (e) {
				element.dispatchEvent(new CustomEvent('svelte-copy:error', { detail: e }));
			}
	}

	let events = typeof params == 'string' ? ['click'] : [params.events].flat(1);
	let text = typeof params == 'string' ? params : params.text;

	events.forEach((event) => {
		if (event) {
			element.addEventListener(event, handle, true);
		}
	});

	return {
		update: (newParams: Parameters | string) => {
			const newEvents = typeof newParams == 'string' ? ['click'] : [newParams.events].flat(1);
			const newText = typeof newParams == 'string' ? newParams : newParams.text;

			const addedEvents = newEvents.filter((x) => !events.includes(x));
			const removedEvents = events.filter((x) => !newEvents.includes(x));

			addedEvents.forEach((event) => {
				if (event) {
					element.addEventListener(event, handle, true);
				}
			});

			removedEvents.forEach((event) => {
				if (event) {
					element.removeEventListener(event, handle, true);
				}
			});

			events = newEvents;
			text = newText;
		},
		destroy: () => {
			events.forEach((event) => {
				if (event) {
					element.removeEventListener(event, handle, true);
				}
			});
		}
	};
};

export const generateLink = (
	form: {
		url?: string | null;
		title?: string | null;
		message?: string | null;
	},
	type: LINK_TYPE
) => {
	if (type === LINK_TYPE.EMAIL && form.message) {
		const url = `mailto:?subject=${encodeURIComponent(form.message?.toString() || '')}`;
		return url;
	}
	if (type === LINK_TYPE.LINKEDIN && form.url) {
		const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
			form.url?.toString() || ''
		)}&title=${encodeURIComponent(form.title?.toString() || '')}&summary=${encodeURIComponent(
			encodeURIComponent(form.message?.toString() || '')
		)}`;
		return url;
	}
	const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		form.message?.toString() || ''
	)}`;
	return url;
};
