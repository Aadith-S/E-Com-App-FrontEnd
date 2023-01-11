import axios from "./axiosInstance"
interface data {
    productName : string,
    productPrice : number,
    productImage : string,
}
const getProduct = async()=>{
    return await axios.get("/products");
}
const addProduct = async(data : data)=>{
    return await axios.post("/addProduct",data);
}
export {getProduct,addProduct}