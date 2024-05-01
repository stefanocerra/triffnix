/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ath61s5faxk8hey",
    "created": "2024-04-12 15:00:13.629Z",
    "updated": "2024-04-12 15:00:13.629Z",
    "name": "throws",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jxzn4qxe",
        "name": "designation",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hml1tb2u",
        "name": "value",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ath61s5faxk8hey");

  return dao.deleteCollection(collection);
})
