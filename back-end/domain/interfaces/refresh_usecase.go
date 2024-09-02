package interfaces

import (
	"context"
	"music_player_backend/domain/models"
)

type RefreshUsecase interface {
	RefreshToken(c context.Context, userID string, refreshToken string) (string, *models.ErrorResponse)
}
