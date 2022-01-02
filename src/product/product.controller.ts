import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service'
@Controller('products')
export class ProductController {

  constructor(
    private productService: ProductService, // implementing the product service
    private httpService: HttpService
    ){} 

  @Get()
  async all(){
    return this.productService.all();
  }
  @Post(':id/like')
  async like(@Param ('id') id: number){
    const product = await this.productService.findOne(id);
    // internal api post req to admin-1 microservice
    this.httpService.post(`http://localhost:8000/api/products/${id}/like`, {}).subscribe(
      response => {
        console.log(response)
      }
    )

    return this.productService.update(id,{
      likes: product.likes + 1
    })
  }
  @EventPattern('hello') // logging the event from rabbitMQ
  async hello(data: string){
    console.log(data)
  }
  @EventPattern('product_created') // logging the event from rabbitMQ
  async productCreated(product: any){
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes
    })
  }
  @EventPattern('product_updated') // logging the event from rabbitMQ
  async productUpdated(product: any){

    await this.productService.update( product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes
    })
  }

  @EventPattern('product_deleted') // logging the event from rabbitMQ
  async productDeleted(id: number){
    await this.productService.delete(id)
  }
}
