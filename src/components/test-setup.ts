import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Mock CSS modules
const mockCSS = new Proxy(
    {},
    {
        get: () => ''
    }
)

// Mock global CSS
global.CSS = mockCSS as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {}
    })
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ''
    readonly thresholds: ReadonlyArray<number> = []
    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    observe() {
        return
    }
    disconnect() {
        return
    }
    unobserve() {
        return
    }
    takeRecords(): IntersectionObserverEntry[] {
        return []
    }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor(_callback: ResizeObserverCallback) {}
    observe() {
        return
    }
    disconnect() {
        return
    }
    unobserve() {
        return
    }
}
