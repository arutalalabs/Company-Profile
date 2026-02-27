// types/it-education.ts — Domain types for IT Education page

export interface CardData {
    title: string
    description: string
    imageSrc: string
    imageAlt: string
}

export interface FieldInfo {
    duration: string
    schedule: string[]
    level: string
}

export interface LearningMethod {
    type: string
    icon: string
}

export interface CategoryData {
    name: string
    image: string
    fieldInfo: FieldInfo
    learningMethods: LearningMethod[]
}
