/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pgjofbjh6vku4g")

  collection.viewRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0pgjofbjh6vku4g")

  collection.viewRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
