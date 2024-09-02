package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Music struct {
	ID        primitive.ObjectID `json:"-" bson:"_id"`
	Title     string             `bson:"title" json:"title" validate:"required"`
	Artist    string             `bson:"artist" json:"artist" validate:"required"`
	Length    int                `bson:"length" json:"length" validate:"required"`
	URL       string             `bson:"url" json:"url" validate:"required"`
	Genres    []string           `bson:"genres" json:"genres"`
	PlayCount int                `bson:"play_count" json:"play_count"`
	CreatedAt time.Time          `bson:"created_at,omitempty" json:"created_at,omitempty"`
}
