package repository

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type genreRepo struct {
	collection *mongo.Collection
}

func NewGenreRepo(database mongo.Database, collection string) *genreRepo {
	return &genreRepo{
		collection: database.Collection(collection),
	}
}
