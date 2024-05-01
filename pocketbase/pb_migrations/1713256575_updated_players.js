/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s90la54olxuz69a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cxw34bfa",
    "name": "fk_gamemode",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0pgjofbjh6vku4g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s90la54olxuz69a")

  // remove
  collection.schema.removeField("cxw34bfa")

  return dao.saveCollection(collection)
})
