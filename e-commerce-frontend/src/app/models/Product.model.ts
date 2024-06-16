import { FileHandle } from "./file-handle.model";

export interface Product{
    productName: string,
    productDescription: string,
    productDiscountPrice: number,
    productActualPrice:number,
    productImages:FileHandle[]
}