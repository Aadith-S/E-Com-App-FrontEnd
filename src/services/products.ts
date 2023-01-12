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
    console.log(param);
    console.log(typeof param.min);
    
    return await axios.get("/products",{params : param});
}
const addProduct = async(data : data)=>{
    return await axios.post("/addProduct",data);
}
export {getProduct,addProduct}