import * as fs from 'fs'
import * as path from 'path'
import { DataTypes, Sequelize } from "sequelize";


export class ModelsLoader {
  private models: any = {};
  private modelsLoaded = false;

  constructor(readonly sequelizeConnection: any) { }

  private toCamelCase (str: string): string {
    const _ = str.indexOf("_");

    if (~_) {
      return this.toCamelCase(str.substring(0, _) 
          + str.substring(_ + 1)
            .substring(0, 1)
            .toUpperCase() 
          + str.substring(_ + 2)
      )
    }
    else {
      return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
  }
  
  public createModels(): object {
    if (this.modelsLoaded) return this.models;
  
    const modelsList = fs.readdirSync(path.resolve(__dirname, "./"))
      .filter((t) => (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf("index") && !~t.indexOf(".map"))
      .map((model) => require(path.join(__dirname, model)).default(this.sequelizeConnection, DataTypes))
  
    for (let i = 0; i < modelsList.length; i++) {
      const modelName = this.toCamelCase(modelsList[i].name);
      this.models[modelName] = modelsList[i];
    }
  
    Object.keys(this.models).forEach((modelName) => {
      if (this.models[modelName].associate) {
        this.models[modelName].associate(this.models);
      }
    });
  
    this.models['sequelize'] = this.sequelizeConnection;
    this.models['Sequelize'] = Sequelize;
  
    this.modelsLoaded = true;
  
    return this.models;
  }
}