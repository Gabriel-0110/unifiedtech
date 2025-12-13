// Lightweight analytics initialization (Google Analytics + Microsoft Clarity)
export function initAnalytics() {
	const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
	const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

	if (gaId && typeof window !== 'undefined' && !(window as any)._gaInitialized) {
		;(window as any)._gaInitialized = true
		const s = document.createElement('script')
		s.async = true
		s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
		document.head.appendChild(s)
		;(window as any).dataLayer = (window as any).dataLayer || []
		function gtag(){;(window as any).dataLayer.push(arguments)}
		// @ts-ignore
		gtag('js', new Date())
		// @ts-ignore
		gtag('config', gaId)
	}

		if (clarityId && typeof window !== 'undefined' && !(window as any)._clarity) {
			;(function(c: any, l: Document, a: string, r: string, i: string){
				c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}
				const t = l.createElement(r) as HTMLScriptElement
				t.async = true
				t.src = 'https://www.clarity.ms/tag/' + i
				const y = l.getElementsByTagName(r)[0] as HTMLElement | undefined
				y?.parentNode?.insertBefore(t, y)
			})(window as any, document, 'clarity', 'script', clarityId)
		}
}

export default initAnalytics
