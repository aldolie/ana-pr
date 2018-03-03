import {Table, Model, PrimaryKey, Column, AutoIncrement, Length, DataType } from "sequelize-typescript";

@Table
export class Analysis extends Model<Analysis> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Length({min: 1, max: 100, msg: 'wrong length'})
  @Column(DataType.TEXT)
  name: string;

  @Column
  value: number;

}