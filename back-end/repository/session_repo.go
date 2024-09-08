package repository

import (
	"context"

	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type sessionRepo struct {
	collection *mongo.Collection
}

func NewSessionRepository(database mongo.Database, collection string) interfaces.SessionRepository {
	return &sessionRepo{
		collection: database.Collection(collection),

	}
}

// SaveToken saves a session token to the database.
func (sr *sessionRepo) SaveToken(ctx context.Context, session *models.Session) *models.ErrorResponse {
	var sessionExists models.Session
	err := sr.collection.FindOne(ctx, bson.M{"user_id": session.UserID}).Decode(&sessionExists)

	if err == nil {
		// updating an existing session
		sr.updateToken(ctx, session)
	}

	// creating new session
	_, nErr := sr.collection.InsertOne(ctx, session)
	if nErr != nil {
		return models.InternalServerError(err.Error())
	}

	return nil

}

// updateToken updates an existing session token in the database.
func (sr *sessionRepo) updateToken(ctx context.Context, session *models.Session) *models.ErrorResponse {
	filter := bson.M{"user_id": session.UserID}
	update := bson.M{
		"$set": bson.M{
			"access_token":  session.AccessToken,
			"refresh_token": session.RefreshToken,
		},
	}

	_, err := sr.collection.UpdateOne(ctx, filter, update)

	if err != nil {
		return models.InternalServerError(err.Error())
	}
	return nil
}

// RemoveToken removes all session tokens from the database based on the user ID.
func (sr *sessionRepo) RemoveToken(ctx context.Context, userID primitive.ObjectID) *models.ErrorResponse {
	filter := bson.M{"user_id": userID}

	_, err := sr.collection.DeleteOne(ctx, filter)
	if err != nil {
		return models.InternalServerError(err.Error())
	}

	return nil
}

// GetToken retrieves a session token from the database based on the user ID.
func (sr *sessionRepo) GetToken(ctx context.Context, userID primitive.ObjectID) (*models.Session, *models.ErrorResponse) {
	var session *models.Session
	
	filter := bson.M{"user_id": userID}
	
	err := sr.collection.FindOne(ctx, filter).Decode(&session)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, models.NotFound("Session not found")
		}
		return nil, models.InternalServerError(err.Error())
	}

	return session, nil
}
