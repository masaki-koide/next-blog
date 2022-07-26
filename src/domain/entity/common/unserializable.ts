type Serializable = string | number | boolean | null
type SerializableObject = {
  [key in string]:
    | Serializable
    | Array<Serializable>
    | SerializableObject
    | Array<SerializableObject>
}

/**
 * domainのentityが実装するinterface
 * Next.jsのgetServerSidePropsやgetStaticPropsはhydrationの関係で、Serializableなオブジェクトをreturnしなければならない。
 * そのため、classオブジェクトが使えない上に、undefinedな値も使えないという制約が発生する。
 * したがって、このinterfaceを実装することで、Serializableなオブジェクトに変換するメソッドの実装を強制させる。
 * @see https://github.com/vercel/next.js/issues/11993#issuecomment-617937409
 */
export interface Unserializable<T extends SerializableObject> {
  toObject(): T
}
