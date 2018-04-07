import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType, AllowNull } from "sequelize-typescript";

@Table
export class Analysis extends Model<Analysis> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Length({min: 1, max: 100, msg: 'wrong length'})
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  value: string; 
 
 
  @AllowNull(false)
  @Column(DataType.INTEGER)
  priviledge: number;

}