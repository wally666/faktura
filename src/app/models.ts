export interface Product {
    id: number,
    name: string,
    category?: Category,
    //shortcat
    type?: ProductType,
    //provider
    //manufacturerCode
    tax?: number,
    unit?: Unit,
    warehouse?: Warehouse,  
}

export interface Unit {
    id: number,
    name?: string
}

export interface Warehouse {
    id: number,
    name?: string
}

export interface Category {
    id: number,
    name?: string
}

export interface DocumentType {
    id: number,
    name?: string
}

export interface ProductType {
    id: number,
    name?: string
}

export interface DocumentProduct {
    id: number,
    document?: Document,
    product: Product,
    unit: Unit,
    quantity: number,
    unitPriceWithTax: number,
    tax: number,
}

export interface Document {
    id: number,
    type: DocumentType,
    number: string,
    creationDate: Date,
    seller: Contractor,
    contractor: Contractor,
    products: Array<DocumentProduct>,
    paymentType?: PaymentType,
    paymentDeadline?: Date,
    notes?: string,
}

export interface Contractor {
    id: number,
    name: string,
}

export interface PaymentType {
    id: number,
    name?: string,
}