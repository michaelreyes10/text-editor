import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const transac = jateDB.transaction("jate", "readwrite");
  const store = transac.objectStore("jate");
  const req = store.put({ id: 1, value: content });
  const res = await req;
  console.log(res);
};

// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (e) => {
  const jateDB = await openDB("jate", 1);
  const transac = jateDB.transaction("jate", "readonly");
  const store = transac.objectStore("jate");
  const req = store.get(1);
  const res = await req;
  return res?.value;
};
initdb();