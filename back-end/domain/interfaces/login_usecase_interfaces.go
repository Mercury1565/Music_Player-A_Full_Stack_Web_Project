package interfaces

import (
	"context"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/models"
)

type LoginUsecase interface {
	LoginUser(ctx context.Context, userReqest dtos.LoginRequest) (*dtos.LoginResponse, *models.ErrorResponse)
	GenerateAccessToken(user *models.User, expiry int) (string, *models.ErrorResponse)
	GenerateRefreshToken(user *models.User, expiry int) (string, *models.ErrorResponse)
}
