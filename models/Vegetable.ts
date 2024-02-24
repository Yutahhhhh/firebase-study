import { ModelBase, type IModelBase } from './ModelBase'

export interface IVegetable extends IModelBase {
  name: string
}
export class Vegetable extends ModelBase implements IVegetable {
  static readonly MODEL_NAME: string = 'vegetables'
  name: string

  constructor(values: Partial<IVegetable>) {
    super(values)
    this.name = values?.name || ''
  }
}
