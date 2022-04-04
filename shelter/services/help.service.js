export default class HelpService {
  constructor() {}

  async getHelpBlocks() {
    let help = await fetch("../assets/our-help.json")
    return help
  }
}

