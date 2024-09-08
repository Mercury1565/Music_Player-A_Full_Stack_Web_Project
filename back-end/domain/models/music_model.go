package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Music struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	ArtistID	   primitive.ObjectID `bson:"artist_id" json:"artist_id"`
	Artist         string             `bson:"artist" json:"artist" validate:"required"`
	Title          string             `bson:"title" json:"title" validate:"required"`
	Genres         []string           `bson:"genres" json:"genres"`
	PlayCount      int                `bson:"play_count" json:"play_count"`
	AudioFilePath  string             `bson:"audio_file_path" json:"audio_file_path"`
	CoverImagePath string             `bson:"cover_image_path" json:"cover_image_path"`
	CreatedAt      time.Time          `bson:"created_at,omitempty" json:"created_at,omitempty"`
}

type Genre struct {
	Name string `bson:"name" json:"name"`
	Image string `bson:"image" json:"image"`
	Count int `bson:"count" json:"count"`
}