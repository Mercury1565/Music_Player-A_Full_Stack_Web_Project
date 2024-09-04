package interfaces

import (
	"context"
	"music_player_backend/domain/models"
)

type SignupUsecase interface {
	CreateUser(ctx context.Context, user *models.User) *models.ErrorResponse
}
