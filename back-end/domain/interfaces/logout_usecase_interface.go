package interfaces

import (
	"context"
	"music_player_backend/domain/models"
)

type LogoutUsecase interface {
	LogoutUser(ctx context.Context, userID string) *models.ErrorResponse
}
