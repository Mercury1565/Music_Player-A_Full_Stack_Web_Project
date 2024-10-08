package dtos

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CreateMusicRequest struct {
	Title    string             `json:"title" validate:"required"`
	Artist   string             `json:"artist" validate:"required"`
	ArtistID primitive.ObjectID `bson:"artist_id" json:"artist_id"`
	Duration string             `json:"duration" validate:"required"`
	Genres   []string           `json:"genres" validate:"required"`
}

type DeleteMusicRequest struct {
	MusicID  primitive.ObjectID `json:"music_id" validate:"required"`
	ArtistID primitive.ObjectID `bson:"author_id" json:"author_id"`
}

type FilterMusicRequest struct {
	Title     string    `json:"title,omitempty"`
	Artist    string    `json:"artist,omitempty"`
	Genres    []string  `json:"tags,omitempty"`
	Date      time.Time `json:"date,omitempty"`
	PlayCount int       `bson:"play_count" json:"play_count"`
}

type CustomError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
