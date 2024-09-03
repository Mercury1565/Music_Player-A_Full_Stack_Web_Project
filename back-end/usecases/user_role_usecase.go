package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type userUsecase struct {
	repo interfaces.UserRepository
}

func NewUserUsecase(repo interfaces.UserRepository) interfaces.PromoteDemoteUserUsecase {
	return &userUsecase{
		repo: repo,
	}
}

func (uc *userUsecase) PromoteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse {
	user, err := uc.repo.GetUserByID(ctx, id)
	if err != nil {
		return err
	}

	// Check if the user is already an admin
	if user.Role == "admin" {
		return models.BadRequest("User is already an admin")
	}

	// Promote the user
	err = uc.repo.PromoteUser(ctx, id)
	if err != nil {
		return err
	}

	return nil
}

func (uc *userUsecase) DemoteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse {
	user, err := uc.repo.GetUserByID(ctx, id)
	if err != nil {
		return err
	}

	// Check if the user is not an admin
	if user.Role != "admin" {
		return models.BadRequest("User is not an admin")
	}

	// Demote the user
	err = uc.repo.DemoteUser(ctx, id)
	if err != nil {
		return err
	}

	return nil
}
