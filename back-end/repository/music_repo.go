package repository

import (
	"context"
	"fmt"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"sort"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type musicRepo struct {
	collection *mongo.Collection
	genreCollection *mongo.Collection
}

func NewMusicRepo(database mongo.Database, collection string, genreCollection string) interfaces.MusicRepository {
	return &musicRepo{
		collection: database.Collection(collection),
		genreCollection: database.Collection(genreCollection),
	}
}

func (musicRepo *musicRepo) CreateMusic(c context.Context, music *models.Music) (*models.Music, *models.ErrorResponse) {
	music.ID = primitive.NewObjectID()
	music.CreatedAt = time.Now()
	music.PlayCount = 0

	_, err := musicRepo.collection.InsertOne(c, music)
	if err != nil {
		return nil, models.InternalServerError("Failed to create music")
	}

	for _, genre := range music.Genres{
		_, e := musicRepo.genreCollection.UpdateOne(c, bson.M{"name": genre}, bson.M{"$inc": bson.M{"count": 1}})
		if e != nil {
			return nil, models.InternalServerError("Failed to increase genre music count")
		}
	}

	return music, nil
}

func (musicRepo *musicRepo) GetMusics(c context.Context) ([]models.Music, *models.ErrorResponse) {
	var musics []models.Music

	cursor, err := musicRepo.collection.Find(c, bson.M{})
	if err != nil {
		return nil, models.InternalServerError("Failed to get musics")
	}
	defer cursor.Close(c)

	_ = cursor.All(c, &musics)
	if musics == nil {
		return nil, models.NotFound("no music found")
	}

	return musics, nil
}

func (musicRepo *musicRepo) GetMusic(c context.Context, musicID primitive.ObjectID) (*models.Music, *models.ErrorResponse) {
	var music *models.Music

	err := musicRepo.collection.FindOne(c, bson.M{"_id": musicID}).Decode(&music)
	if err != nil {
		return nil, models.NotFound("music not found")
	}

	return music, nil
}

func (musicRepo *musicRepo) GetMusicByArtistID(c context.Context, artistID primitive.ObjectID) ([]models.Music, *models.ErrorResponse) {
	var musics []models.Music

	cursor, err := musicRepo.collection.Find(c, bson.M{"artist_id": artistID})
	if err != nil {
		return nil, models.InternalServerError("Failed to get musics")
	}
	defer cursor.Close(c)

	_ = cursor.All(c, &musics)
	if musics == nil {
		return nil, models.NotFound("no music found")
	}

	return musics, nil
}

func (musicRepo *musicRepo) GetTopMusics(c context.Context, limit int) ([]models.Music, *models.ErrorResponse) {
	var musics []models.Music

	cursor, err := musicRepo.collection.Find(c, bson.M{})
	if err != nil {
		return nil, models.InternalServerError("Failed to get top musics")
	}
	defer cursor.Close(c)

	_ = cursor.All(c, &musics)
	if musics == nil {
		return nil, models.NotFound("no music found")
	}

	sort.Slice(musics, func(i, j int) bool {
		return musics[i].PlayCount > musics[j].PlayCount
	})

	if limit > len(musics) {
		limit = len(musics)
	}

	return musics[:limit], nil
}

func (musicRepo *musicRepo) GetRecentMusics(c context.Context, limit int) ([]models.Music, *models.ErrorResponse) {
	var musics []models.Music

	cursor, err := musicRepo.collection.Find(c, bson.M{})
	if err != nil {
		return nil, models.InternalServerError("Failed to get recent musics")
	}
	defer cursor.Close(c)

	_ = cursor.All(c, &musics)
	if musics == nil {
		return nil, models.NotFound("no music found")
	}

	sort.Slice(musics, func(i, j int) bool {
		return musics[i].CreatedAt.After(musics[j].CreatedAt)
	})

	if limit > len(musics) {
		limit = len(musics)
	}

	return musics[:limit], nil
}

func (musicRepo *musicRepo) SearchMusics(ctx context.Context, filter dtos.FilterMusicRequest) ([]models.Music, *models.ErrorResponse) {
	var musics []models.Music
	query := bson.M{}

	orConditions := []bson.M{}

	if filter.Title != "" {
		orConditions = append(orConditions, bson.M{"title": bson.M{"$regex": filter.Title, "$options": "i"}})
	}

	if filter.Artist != "" {
		orConditions = append(orConditions, bson.M{"artist": bson.M{"$regex": filter.Artist, "$options": "i"}})
	}

	if len(filter.Genres) > 0 {
		orConditions = append(orConditions, bson.M{"genres": bson.M{"$in": filter.Genres}})
	}

	if filter.PlayCount > 0 {
		orConditions = append(orConditions, bson.M{"play_count": bson.M{"$gt": filter.PlayCount}})
	}

	if !filter.Date.IsZero() {
		orConditions = append(orConditions, bson.M{"created_at": bson.M{"$gt": filter.Date}})
	}

	if len(orConditions) > 0 {
		query["$or"] = orConditions
	}

	cursor, err := musicRepo.collection.Find(ctx, query)
	if err != nil {
		return nil, models.InternalServerError("Failed to search musics")
	}
	defer cursor.Close(ctx)

	cursor.All(ctx, &musics)
	if err := cursor.Err(); err != nil {
		return nil, models.InternalServerError("Cursor error occurred while searching musics")
	}

	return musics, nil
}

func (musicRepo *musicRepo) GetGenreList(c context.Context) ([]models.Genre, *models.ErrorResponse) {
	var genres []models.Genre

	cursor, err := musicRepo.genreCollection.Find(c, bson.M{})
	if err != nil {
		return nil, models.InternalServerError("Failed to get genres")
	}
	defer cursor.Close(c)

	_ = cursor.All(c, &genres)
	if genres == nil {
		return nil, models.NotFound("no genre found")
	}

	return genres, nil
}

	
func (musicRepo *musicRepo) DeleteMusic(c context.Context, musicID primitive.ObjectID) *models.ErrorResponse {
	music, e := musicRepo.GetMusic(c, musicID)
	if e != nil {
		return e
	}

	for _, genre := range music.Genres{
		_, e := musicRepo.genreCollection.UpdateOne(c, bson.M{"name": genre}, bson.M{"$inc": bson.M{"count": -1}})
		if e != nil {
			return models.InternalServerError("Failed to decrease genre music count")
		}
	}

	deleteResult, err := musicRepo.collection.DeleteOne(c, bson.M{"_id": musicID})
	if err != nil {
		return models.InternalServerError("Failed to delete music")
	}

	if deleteResult.DeletedCount == 0 {
		// music with id 'musicID' not found
		return models.NotFound(fmt.Sprintf("Music with id %s not found", musicID.Hex()))
	}

	return nil
}

func (musicRepo *musicRepo) IncreasePlayCount(c context.Context, musicID primitive.ObjectID) *models.ErrorResponse {
	music, err := musicRepo.GetMusic(c, musicID)
	if err != nil {
		return err
	}

	music.PlayCount++ // Increase the play count by 1

	_, e := musicRepo.collection.UpdateOne(c, bson.M{"_id": musicID}, bson.M{"$set": bson.M{"play_count": music.PlayCount}})
	if e != nil {
		return models.InternalServerError("Failed to increase play count")
	}

	return nil
}
