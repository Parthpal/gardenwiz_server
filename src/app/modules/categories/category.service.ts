import { Category } from "./category.model"

const getCategoryS=()=>{
    const result=Category.find();
    return result;
}

export const CategoryServices={
    getCategoryS,
}