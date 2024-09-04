package usecases

import (
	"context"
	"music_player_backend/config"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
)

type loginUsecase struct {
	jwtService      interfaces.JwtService
	passwordService interfaces.PasswordService
	repository      interfaces.UserRepository
	sessionRepo     interfaces.SessionRepository
	env             config.Env
}

func NewLoginUsecase(jwtService interfaces.JwtService, passwordService interfaces.PasswordService, repository interfaces.UserRepository, sessionRepo interfaces.SessionRepository, env config.Env) interfaces.LoginUsecase {
	return &loginUsecase{
		jwtService:      jwtService,
		passwordService: passwordService,
		repository:      repository,
		sessionRepo:     sessionRepo,
		env:             env,
	}
}

func (uc *loginUsecase) LoginUser(ctx context.Context, userReqest dtos.LoginRequest) (*dtos.LoginResponse, *models.ErrorResponse) {
	// check if the user exists
	user, err := uc.repository.GetUserByEmail(ctx, userReqest.Email)
	if err != nil {
		return nil, err
	}

	// validate password
	if validPassword := uc.passwordService.ValidatePassword(userReqest.Password, user.Password); !validPassword {
		return nil, models.Unauthorized("Invalid creaditional")
	}

	// generate access and refresh token
	accessToken, aErr := uc.GenerateAccessToken(user, uc.env.ACCESS_TOKEN_EXPIRY_HOUR)
	refresheToken, rErr := uc.GenerateRefreshToken(user, uc.env.REFRESH_TOKEN_EXPIRY_HOUR)

	if aErr != nil || rErr != nil {
		return nil, models.InternalServerError("Internal Server Error")
	}

	loginResponse := &dtos.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refresheToken,
	}

	session := models.Session{
		UserID:       user.ID,
		RefreshToken: refresheToken,
		AccessToken:  accessToken,
	}

	if tErr := uc.sessionRepo.SaveToken(ctx, &session); tErr != nil {
		return nil, tErr
	}

	return loginResponse, nil

}
func (uc *loginUsecase) GenerateAccessToken(user *models.User, expiry int) (string, *models.ErrorResponse) {
	token, err := uc.jwtService.CreateAccessToken(*user, expiry)

	if err != nil {
		return "", models.InternalServerError("Error occured while generating the access token")
	}

	return token, nil
}

func (uc *loginUsecase) GenerateRefreshToken(user *models.User, expiry int) (string, *models.ErrorResponse) {
	token, err := uc.jwtService.CreateRefreshToken(*user, expiry)

	if err != nil {
		return "", models.InternalServerError("Error occured while creating the refresh token")
	}

	return token, nil
}
