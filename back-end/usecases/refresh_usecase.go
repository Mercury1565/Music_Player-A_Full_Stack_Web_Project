package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type refreshUsecase struct {
	jwtService     interfaces.JwtService
	userRepository interfaces.UserRepository
}

func NewRefreshUsecase(jwtService interfaces.JwtService, userRepository interfaces.UserRepository) interfaces.RefreshUsecase {
	return &refreshUsecase{
		jwtService:     jwtService,
		userRepository: userRepository,
	}
}

func (uc *refreshUsecase) RefreshToken(ctx context.Context, userID primitive.ObjectID, refreshToken string, expiry int) (string, *models.ErrorResponse) {
	user, err := uc.userRepository.GetUserByID(ctx, userID)
	if err != nil {
		return "", err
	}

	accessToken, tErr := uc.jwtService.CreateAccessToken(*user, expiry)
	if tErr != nil {
		return "", models.InternalServerError("An unexpected error occurred")
	}

	return accessToken, err
}
