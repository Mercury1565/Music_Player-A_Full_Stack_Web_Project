package interfaces

import (
	"context"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LogoutUsecase interface {
	LogoutUser(ctx context.Context, userID primitive.ObjectID) *models.ErrorResponse
}
