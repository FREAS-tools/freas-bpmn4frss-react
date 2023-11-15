/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VALIDATION_ANALYZER_URL: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}