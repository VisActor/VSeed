import { VBIBuilderInterface, VBIDSL } from 'src/types'

export class BuilderContext implements BuilderContext {
  private vbiBuilder: VBIBuilderInterface
  constructor(builder: VBIBuilderInterface) {
    this.vbiBuilder = builder
  }

  getVBIDSL(): VBIDSL {
    return this.vbiBuilder.vbiDSL
  }

  static from = (builder: VBIBuilderInterface) => {
    return new BuilderContext(builder)
  }
}
