package interfaces

import (
	"context"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RefreshUsecase interface {
	RefreshToken(c context.Context, userID primitive.ObjectID, refreshToken string, expiry int) (string, *models.ErrorResponse)
}
