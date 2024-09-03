package interfaces

import (
	"context"
	"mime/multipart"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) *models.ErrorResponse
	GetUserByID(ctx context.Context, id primitive.ObjectID) (*models.User, *models.ErrorResponse)
	GetUserByEmail(ctx context.Context, email string) (*models.User, *models.ErrorResponse)
	GetUserByName(ctx context.Context, name string) (*models.User, *models.ErrorResponse)
	UpdateUser(ctx context.Context, user *models.User, id primitive.ObjectID) *models.ErrorResponse
	DeleteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse
	PromoteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse
	DemoteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse
}

type UserProfileUpdateUsecase interface {
	GetUserProfile(ctx context.Context, userID string) (*dtos.Profile, *models.ErrorResponse)
	DeleteUserProfile(ctx context.Context, userID string) *models.ErrorResponse
	UpdateUserProfile(ctx context.Context, userID string, user *dtos.ProfileUpdateRequest, file *multipart.FileHeader) *models.ErrorResponse
}
