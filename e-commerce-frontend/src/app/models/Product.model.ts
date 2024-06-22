import { FileHandle } from "./file-handle.model";

export interface Product{
    id: null;
    productName: string,
    productDescription: string,
    productDiscountPrice: number,
    productActualPrice:number,
    productImages:FileHandle[]
}