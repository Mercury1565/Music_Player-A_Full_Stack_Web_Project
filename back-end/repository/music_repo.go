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

func (musicRepo *musicRepo) GetGenreList(c context.Context) ([]map[string]interface{}, *models.ErrorResponse) {
	// A map to store the genre counts
	genreCounts := make(map[string]int)

	// Find all music entries
	cursor, err := musicRepo.collection.Find(c, bson.M{})
	if err != nil {
		return nil, models.InternalServerError("Failed to retrieve music data")
	}
	defer cursor.Close(c)

	// Iterate over each music entry
	for cursor.Next(c) {
		var music struct {
			Genres []string `bson:"genres"`
		}
		if err := cursor.Decode(&music); err != nil {
			return nil, models.InternalServerError("Failed to decode music data")
		}

		// Count each genre in the music entry
		for _, genre := range music.Genres {
			genreCounts[genre]++
		}
	}

	// Query to get image URLs for each genre from the database
	var genreList []map[string]interface{}
	for genre, count := range genreCounts {
		var genreInfo models.Genre

		err := musicRepo.genreCollection.FindOne(c, bson.M{"genre": genre}).Decode(&genreInfo)
		if err != nil {
			// If no image found, set default image
			genreInfo.Image = "https://demofree.sirv.com/nope-not-here.jpg"
		}

		// Construct the genre object with image
		genreList = append(genreList, map[string]interface{}{
			"genre": genre,
			"count": count,
			"image": genreInfo.Image,
		})
	}

	// Check if any genres were found
	if len(genreList) == 0 {
		return nil, models.NotFound("No genres found")
	}

	return genreList, nil
}

	
func (musicRepo *musicRepo) DeleteMusic(c context.Context, musicID primitive.ObjectID) *models.ErrorResponse {
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
