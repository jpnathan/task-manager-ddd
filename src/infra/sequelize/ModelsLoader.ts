import fs from 'fs';
import path from 'path';

export = {
  load({ sequelize, baseFolder }) {
    const loaded = { database: sequelize};

    fs
      .readdirSync(baseFolder)
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        const model = sequelize['import'](path.join(baseFolder, file));
        const modelName = file.split('.')[0];
        loaded[modelName] = model;
      });

    Object.keys(loaded).forEach((modelName) => {
      if(loaded[modelName].associate) {
        loaded[modelName].associate(loaded);
      }
    });

    // loaded['database'] = sequelize;

    return loaded;
  }
};
