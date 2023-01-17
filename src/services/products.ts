import axios from "./axiosInstance"
interface data {
    productName : string,
    productPrice : number,
    productImage : string,
}
interface param{
    sort ?: string,
    min ?: number,
    max ?: number
}
const getProduct = async(param : param ={})=>{
    return await axios.get("/products",{params : param});
}
const addProduct = async(data : data)=>{
    return await axios.post("/products",data);
}
export {getProduct,addProduct}