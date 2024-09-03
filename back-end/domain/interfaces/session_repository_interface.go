package interfaces

import (
	"context"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SessionRepository interface {
	SaveToken(ctx context.Context, session *models.Session) *models.ErrorResponse
	RemoveToken(ctx context.Context, userID primitive.ObjectID) *models.ErrorResponse
	GetToken(ctx context.Context, userID primitive.ObjectID) (*models.Session, *models.ErrorResponse)
}
