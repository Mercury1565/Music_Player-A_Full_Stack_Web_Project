package interfaces

import (
	"context"
	"music_player_backend/domain/models"
)

type SessionRepository interface {
	SaveToken(ctx context.Context, session *models.Session) *models.ErrorResponse
	UpdateToken(ctx context.Context, session *models.Session) *models.ErrorResponse
	RemoveToken(ctx context.Context, userID string) *models.ErrorResponse
	GetToken(ctx context.Context, userID string) (*models.Session, *models.ErrorResponse)
}
