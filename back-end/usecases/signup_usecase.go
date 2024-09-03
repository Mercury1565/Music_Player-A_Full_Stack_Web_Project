package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
)

type signupUsecase struct {
	repository interfaces.UserRepository
	jwtService interfaces.JwtService
	passwordService interfaces.PasswordService
}

func NewSignupUsecase(repository interfaces.UserRepository, jwtService interfaces.JwtService, passwordService interfaces.PasswordService) interfaces.SignupUsecase {
	return &signupUsecase{
		repository: repository,
		jwtService: jwtService,
		passwordService: passwordService,
	}
}

func (uc *signupUsecase) CreateUser(ctx context.Context, user *models.User) *models.ErrorResponse {
	// check if user doesn't exist
	userExist, userExistError := uc.repository.GetUserByEmail(ctx, user.Email)

	if userExist != nil && userExistError == nil {
		return models.BadRequest("User already exists")
	}

	if err := uc.passwordService.ValidatePasswordStrength(user.Password); err != nil {
		return err
	}

	hashedPassword, hErr := uc.passwordService.EncryptPassword(user.Password)
	if hErr != nil {
		return models.InternalServerError("An error occurred while setting the password")
	}

	newUser := models.User{
		Name:     user.Name,
		Email:    user.Email,
		Password: hashedPassword,
		Role:     "user",
	}

	// create user
	err := uc.repository.CreateUser(ctx, &newUser)
	if err != nil {
		return err
	}

	return nil
}
