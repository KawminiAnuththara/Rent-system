import Product from "../models/product.js";
import { isItAdmin } from "./UserController.js";


//add product
export function addProduct(req,res){

    console.log(req.user)

    if(req.user == null){
      res.status(401).json({
        message : "Please login and try again"
      })
      return
    }
    if(req.user.role !="admin"){
      res.status(403).json({
        message : "You are not authorized to perform this action"
      })
      return
    }


    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save()
    .then(()=>{
        res.json({message:"Product added successfully"});
    })
    .catch((error)=>{
        res.status(500).json({error:"Product addition failed"});
    });
}

//view product
export async function getProducts(req,res){

  // check logging person is admin or not because  only admin can view availability false item
  /* let isAdmin = false;

  if(req.user != null){
    if(req.user.role == "admin"){
      isAdmin=true;
    }
  } */
   //let isAdmin= isItAdmin(req);  //used below function that function goes to usercontroller and then export
  try {
     if(isItAdmin(req)){
      const products=await Product.find();
      res.json(products);
      return;
     }else{
      const products= await Product.find(
        {availability:true}      //person is not admin they can only view availability equal true item
      );
      res.json(products);
      return;
     }
    
  } catch (e) {
    res.status(500).json({
      message:"failed to get products"
    })
  }
}
// update product

export async function updateProduct(req,res){
  try {
    if(isItAdmin(req)){
      const key = req.params.key;
      const data =req.body;

      await Product.updateOne({key:key},data)
      
      res.json({
        message:"Product updated successfully"
      })
    }else{
      res.status(403).json({
        message:"You are not authorized to perform this action"
      })
      return;
    }
    
  } catch (e) {
    res.status(500).json({
      message:"Failed to update product"
    })
  }
}

//delete product
export async function deleteProduct(req,res){
  try {
    if(isItAdmin(req)){
      const key =req.params.key;
      await Product.deleteOne({key:key})
      res.json({
        message:"Product deleted successfully"
      })
    }else{
      res.status(403).json({
        message:"You are not authorized to perform this action"
      })
      return;
    }
  } catch (e) {
    res.status(500).json({
      message:"Failed to delete product"
    })
  }
}


