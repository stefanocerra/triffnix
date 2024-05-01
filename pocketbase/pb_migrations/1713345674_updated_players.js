/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s90la54olxuz69a")

  // remove
  collection.schema.removeField("3offwi1k")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s90la54olxuz69a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3offwi1k",
    "name": "fk_throws",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ath61s5faxk8hey",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
