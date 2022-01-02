import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from "mongoose"
// this interacts with Mongo DB
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name)private readonly productModel: Model<ProductDocument>,
  ){
    
  }

// get all products
  async all(): Promise<Product[]>{
    return this.productModel.find().exec();
  }
// create product 
  async create(data): Promise<Product>{
    return new this.productModel(data).save() 
  } 
// find a product
  async findOne(id:number): Promise<Product>{
    return this.productModel.findOne({id})
  }
  //update a product
  async update(id:number,data): Promise<any> {
    return this.productModel.findOneAndUpdate({id},data)
  }
  //delete a product
  async delete(id:number): Promise<void> {
   this.productModel.deleteOne({id})
  }
}
