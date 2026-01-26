# 📡 API Service Layer - Documentation

## Struktur Folder

```
src/
├── lib/
│   └── api/
│       ├── client.ts      → Base API client with timeout & error handling
│       ├── messages.ts    → Messages API service
│       └── index.ts       → Barrel exports
└── hooks/
    └── useContactForm.ts  → Custom hook for form submission
```

---

## 🔧 Cara Menggunakan

### 1. Import Hook di Component

```tsx
import { useContactForm } from '@/hooks/useContactForm'

function ContactForm() {
    const { isSubmitting, submitStatus, submitForm } = useContactForm()
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const success = await submitForm(formData)
        
        if (success) {
            // Reset form atau redirect
        }
    }
}
```

### 2. Gunakan API Service Langsung (Jika Perlu)

```tsx
import { messagesApi } from '@/lib/api/messages'

async function sendMessage() {
    try {
        const response = await messagesApi.send({
            senderName: 'John',
            senderEmail: 'john@example.com',
            senderPhone: '+6281234567890',
            subject: ['IT Education'],
            messageBody: 'Hello!'
        })
        
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
```

### 3. Gunakan Base Client untuk Endpoint Lain

```tsx
import { apiGet, apiPost } from '@/lib/api/client'

// GET request
const users = await apiGet<User[]>('/users')

// POST request
const newUser = await apiPost<User>('/users', {
    name: 'John Doe'
})
```

---

## 🎯 Keuntungan Struktur Ini

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| **Reusability** | ❌ Fetch logic di component | ✅ Reusable di mana saja |
| **Type Safety** | ⚠️ Manual typing | ✅ Full TypeScript |
| **Testing** | ❌ Sulit test | ✅ Easy to test |
| **Error Handling** | ⚠️ Basic try-catch | ✅ Comprehensive |
| **Maintenance** | ❌ Sulit maintain | ✅ Mudah maintain |
| **Timeout** | ❌ Tidak ada | ✅ 10s default |

---

## 📝 Type Definitions

### MessageFormData
```typescript
interface MessageFormData {
    senderName: string
    senderEmail: string
    organizationName?: string
    senderPhone: string
    subject: string[]
    messageBody: string
}
```

### MessageResponse
```typescript
interface MessageResponse {
    success: boolean
    message: string
    data?: {
        id?: string
        createdAt?: string
    }
}
```

---

## 🚀 Future Improvements

- [ ] Tambahkan retry logic untuk failed requests
- [ ] Implementasi caching dengan React Query / SWR
- [ ] Tambahkan request interceptor untuk auth token
- [ ] Implementasi rate limiting
- [ ] Logging & monitoring

---

## 🔐 Environment Variables

Pastikan `.env.local` sudah diset:

```env
NEXT_PUBLIC_API_URL=https://backend-cms-arutala.vercel.app
```

Default fallback: `https://backend-cms-arutala.vercel.app`
