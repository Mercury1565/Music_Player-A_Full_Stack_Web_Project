package interfaces

import (
	"context"
	"mime/multipart"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MusicRepository interface {
	CreateMusic(ctx context.Context, Music *models.Music) (*models.Music, *models.ErrorResponse)
	GetMusics(ctx context.Context) ([]models.Music, *models.ErrorResponse)
	GetMusic(ctx context.Context, id primitive.ObjectID) (*models.Music, *models.ErrorResponse)
	SearchMusics(ctx context.Context, filter dtos.FilterMusicRequest) ([]models.Music, *models.ErrorResponse)
	// UpdateMusic(ctx context.Context, MusicID primitive.ObjectID, Music *models.Music) *models.ErrorResponse
	DeleteMusic(ctx context.Context, id primitive.ObjectID) *models.ErrorResponse
	IncreasePlayCount(ctx context.Context, MusicID primitive.ObjectID) *models.ErrorResponse
	GetMusicByArtistID(c context.Context, artistID primitive.ObjectID) ([]models.Music, *models.ErrorResponse)
	GetTopMusics(c context.Context, limit int) ([]models.Music, *models.ErrorResponse)
	GetRecentMusics(c context.Context, limit int) ([]models.Music, *models.ErrorResponse) 
}

type MusicUsecase interface {
	CreateMusic(ctx context.Context, newMusic *dtos.CreateMusicRequest, audioFile *multipart.FileHeader, coverImage *multipart.FileHeader) (*models.Music, *models.ErrorResponse)
	GetMusic(ctx context.Context, id primitive.ObjectID) (*models.Music, *models.ErrorResponse)
	GetMusics(ctx context.Context) ([]models.Music, *models.ErrorResponse)
	SearchMusics(ctx context.Context, filter dtos.FilterMusicRequest) ([]models.Music, *models.ErrorResponse)
	// UpdateMusic(ctx context.Context, MusicID primitive.ObjectID, Music *models.Music) *models.ErrorResponse
	DeleteMusic(ctx context.Context, deleteMusicReq dtos.DeleteMusicRequest) *models.ErrorResponse
	GetMusicByArtistID(c context.Context, artistID primitive.ObjectID) ([]models.Music, *models.ErrorResponse)
	GetTopMusics(ctx context.Context, limit int) ([]models.Music, *models.ErrorResponse) 
	GetRecentMusics(ctx context.Context, limit int) ([]models.Music, *models.ErrorResponse)	
}

type MusicController interface {
	CreateMusicController(ctx *gin.Context)
	GetMusicController(ctx *gin.Context)
	GetMusicsController(ctx *gin.Context)
	SearchMusicsController(ctx *gin.Context)
	// UpdateMusicController(ctx *gin.Context)
	DeleteMusicController(ctx *gin.Context)
	TrackPopularityController(ctx *gin.Context)
}
