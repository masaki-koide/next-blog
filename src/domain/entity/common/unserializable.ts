type Serializable = {
  [key in string]: string | number | boolean | null | Serializable
}

export interface Unserializable<T extends Serializable> {
  toObject(): T
}
