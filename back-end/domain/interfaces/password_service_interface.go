package interfaces

import (
	"context"
	"music_player_backend/domain/models"
)

type PasswordService interface {
	EncryptPassword(password string) (string, error)
	ValidatePassword(password string, hashedPassword string) bool
	ValidatePasswordStrength(password string) *models.ErrorResponse
}

type PasswordUsecase interface {
	GenerateResetURL(ctx context.Context, email string) (string, *models.ErrorResponse)
	SendResetEmail(ctx context.Context, email string, resetURL string) *models.ErrorResponse
	SetNewUserPassword(ctx context.Context, shortURlCode string, password string) *models.ErrorResponse
	SetUpdateUserPassword(ctx context.Context, shortURlCode string, password string) *models.ErrorResponse
}
