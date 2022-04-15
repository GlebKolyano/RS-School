export default class HelpService {
  constructor() {}

  async getHelpBlocks() {

    let help = await fetch("/glebkolyano-JSFE2022Q1/shelter/assets/our-help.json")

    // /glebkolyano-JSFE2022Q1/shelter/assets/our-help.json
    
    return help
  }
}

