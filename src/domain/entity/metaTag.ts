import { Tag } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'

export type MetaTagDto = {
  attributes: {
    property: string
    content: string
  } | null
  content: string | null
  tag: string
}

export class MetaTag implements Unserializable<MetaTagDto> {
  #attributes: {
    property: string
    content: string
  } | null

  #content: string | null

  #tag: string

  constructor(metaTag: Tag) {
    this.#attributes = metaTag.attributes
    this.#content = metaTag.content ?? null
    this.#tag = metaTag.tag
  }

  toObject() {
    return {
      attributes: this.#attributes,
      content: this.#content,
      tag: this.#tag,
    }
  }
}
