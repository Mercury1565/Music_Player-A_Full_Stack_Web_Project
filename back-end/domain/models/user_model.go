package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	UserID   primitive.ObjectID `bson:"_id"`
	Name     string             `bson:"name"`
	Email    string             `bson:"email"`
	Password string             `bson:"password"`
}
