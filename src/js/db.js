export default class DB {
  static id = 1;

  static serilizer(data) {
    return JSON.stringify(data);
  }

  static deserializer(json) {
    return JSON.parse(json);
  }

  static createEntry(name, price) {
    const obj = {
      name,
      price,
    };
    const value = DB.serilizer(obj);
    localStorage.setItem(DB.id, value);
    DB.id += 1;
  }

  static readingNote(id) {
    const json = localStorage.getItem(id);
    return DB.deserializer(json);
  }

  static changingNote(id, name, price) {
    const obj = {
      name,
      price,
    };
    const value = DB.serilizer(obj);
    localStorage.setItem(id, value);
  }

  static allDBentries() {
    const databaseList = [];
    const keys = Object.keys(localStorage);
    keys.forEach((id) => {
      if (id === '0') return;
      const obj = DB.readingNote(id);
      obj.id = id;
      databaseList.push(obj);
    });
    return databaseList;
  }

  static delDbNote(id) {
    localStorage.removeItem(id);
  }
}
