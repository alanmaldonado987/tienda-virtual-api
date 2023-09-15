import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' }) // Transformar la clase en una tabla
export class Product{
 
    @PrimaryGeneratedColumn() // ID autoincremental
    id: number

    @Column() // Transoformar en columna de una tabla
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    category: string

    @Column()
    stock: number
}