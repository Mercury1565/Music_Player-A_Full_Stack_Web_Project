package repository

import (
	"context"
	"fmt"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type userRepo struct {
	collection *mongo.Collection
}

func NewUserRepo(database mongo.Database, collection string) interfaces.UserRepository {
	return &userRepo{
		collection: database.Collection(collection),
	}
}

func (ur *userRepo) CreateUser(ctx context.Context, user *models.User) *models.ErrorResponse {
	user.ID = primitive.NewObjectID()
	user.FavouriteMusics = []primitive.ObjectID{}

	_, err := ur.collection.InsertOne(ctx, user)
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

// GetUserByID fetches a user by their ID.
func (ur *userRepo) GetUserByID(ctx context.Context, id primitive.ObjectID) (*models.User, *models.ErrorResponse) {
	var user models.User

	err := ur.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, models.NotFound("user with the given ID not found")
		}
		return nil, models.InternalServerError("error fetching user " + err.Error())
	}

	return &user, nil
}

func (ur *userRepo) GetUserByEmail(ctx context.Context, email string) (*models.User, *models.ErrorResponse) {
	var user models.User

	err := ur.collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, models.NotFound("user not found")
		}
		fmt.Println("right here")
		return nil, models.NotFound(err.Error())
	}

	return &user, nil
}

func (ur *userRepo) GetUserByName(ctx context.Context, name string) (*models.User, *models.ErrorResponse) {
	var user *models.User

	err := ur.collection.FindOne(ctx, bson.M{"name": name}).Decode(user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, models.NotFound("user not found")
		}
		return nil, models.NotFound(err.Error())
	}

	return user, nil
}

// UpdateUser updates a user's information.
func (ur *userRepo) UpdateUser(ctx context.Context, user *models.User, id primitive.ObjectID) *models.ErrorResponse {
	filter := bson.M{"_id": id}
	update := bson.M{}

	if user.Name != "" {
		update["name"] = user.Name
	}
	if user.Email != "" {
		update["email"] = user.Email
	}
	if user.Password != "" {
		update["password"] = user.Password
	}

	if len(update) == 0 {
		return nil
	}

	_, err := ur.collection.UpdateOne(ctx, filter, bson.M{"$set": update})
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

// DeleteUser deletes a user by their ID.
func (ur *userRepo) DeleteUser(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse {
	_, err := ur.collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

func (userRepo *userRepo) AddFavouriteMusic(ctx context.Context, userID primitive.ObjectID, musicID primitive.ObjectID) *models.ErrorResponse {
	filter := bson.M{"_id": userID}
	update := bson.M{
		"$addToSet": bson.M{"favourite_musics": musicID},
	}

	_, err := userRepo.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

func (userRepo *userRepo) RemoveFavouriteMusic(ctx context.Context, userID primitive.ObjectID, musicID primitive.ObjectID) *models.ErrorResponse {
	filter := bson.M{"_id": userID}
	update := bson.M{
		"$pull": bson.M{"favourite_musics": musicID},
	}

	_, err := userRepo.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

func (userRepo *userRepo) GetUserFavouriteMusics(ctx context.Context, userID primitive.ObjectID) ([]primitive.ObjectID, *models.ErrorResponse) {
	var user models.User
	err := userRepo.collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		return nil, models.InternalServerError(err.Error())
	}

	return user.FavouriteMusics, nil
}

// updateUserRole is a helper method to update a user's role.
// func (ur *userRepo) updateUserRole(ctx context.Context, id primitive.ObjectID, role string) *models.ErrorResponse {
// 	filter := bson.M{"_id": id}
// 	update := bson.M{
// 		"$set": bson.M{"role": role},
// 	}

// 	_, err := ur.collection.UpdateOne(ctx, filter, update)
// 	if err != nil {
// 		return models.InternalServerError(err.Error())
// 	}

// 	return nil
// }
