import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType, NotNull } from "sequelize-typescript";

@Table
export class Analysis extends Model<Analysis> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Length({min: 1, max: 100, msg: 'wrong length'})
  @Column(DataType.TEXT)
  name: string;

  @NotNull
  @Column
  value: number;
  
  @NotNull
  @Column(DataType.INTEGER)
  priviledge: number;

}