type Serializable = {
  [key in string]: string | number | boolean | null | Serializable
}

/**
 * domainのentityが実装するinterface
 * Next.jsのgetServerSidePropsやgetStaticPropsはhydrationの関係で、Serializableなオブジェクトをreturnしなければならない。
 * そのため、classオブジェクトが使えない上に、undefinedな値も使えないという制約が発生する。
 * したがって、このinterfaceを実装することで、Serializableなオブジェクトに変換するメソッドの実装を強制させる。
 * @see https://github.com/vercel/next.js/issues/11993#issuecomment-617937409
 */
export interface Unserializable<T extends Serializable> {
  toObject(): T
}