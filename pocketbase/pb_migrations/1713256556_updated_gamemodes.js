/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pgjofbjh6vku4g")

  // remove
  collection.schema.removeField("hdjy4bqy")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pgjofbjh6vku4g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hdjy4bqy",
    "name": "fk_players",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "s90la54olxuz69a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
