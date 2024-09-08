package controllers

import (
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
	"time"

	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MusicController struct {
	usecase    interfaces.MusicUsecase
	cloudinary interfaces.CloudinaryInterface
}

func NewMusicController(usecase interfaces.MusicUsecase, cloudinary interfaces.CloudinaryInterface) *MusicController {
	return &MusicController{
		usecase:    usecase,
		cloudinary: cloudinary,
	}
}

func (musicController *MusicController) CreateMusicController(ctx *gin.Context) {
	var newMusic dtos.CreateMusicRequest
	artistId := ctx.GetString("id")
	validate := validator.New()

	newMusic.ArtistID, _ = primitive.ObjectIDFromHex(artistId)
	newMusic.Artist = ctx.PostForm("artist")
	newMusic.Title = ctx.PostForm("title")
	newMusic.Genres = strings.Split(ctx.PostForm("genres"), ",")

	audioFile, err := ctx.FormFile("music")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Audio file is missing"})
		return
	}

	coverImage, err := ctx.FormFile("cover_image")
	if err != nil {
		coverImage = &multipart.FileHeader{}
	}

	if err := validate.Struct(newMusic); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "One or more fields are missing"})
		return
	}

	music, e := musicController.usecase.CreateMusic(ctx, &newMusic, audioFile, coverImage)
	if e != nil {
		ctx.JSON(e.Code, gin.H{"error": e.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": music, "message": "new music added sucessfully"})
}

func (musicController *MusicController) GetMusicController(ctx *gin.Context) {
	musicId, e := primitive.ObjectIDFromHex(ctx.Param("id"))
	if e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}

	music, err := musicController.usecase.GetMusic(ctx, musicId)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": music})
}

func (musicController *MusicController) GetMusicsController(ctx *gin.Context) {
	musics, err := musicController.usecase.GetMusics(ctx)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": musics})
}

func (musicController *MusicController) GetMusicsByArtistIDController(ctx *gin.Context) {
	artistID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid artist id"})
		return
	}

	music, err := musicController.usecase.GetMusicByArtistID(ctx, artistID)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": music})
}

func (musicController *MusicController) GetTopMusicsController(ctx *gin.Context) {
	limit, _ := strconv.ParseInt(ctx.DefaultQuery("limit", "30"), 10, 64)

	musics, err := musicController.usecase.GetTopMusics(ctx, int(limit))
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": musics})
}

func (musicController *MusicController) GetRecentMusicsController(ctx *gin.Context) {
	limit, _ := strconv.ParseInt(ctx.DefaultQuery("limit", "30"), 10, 64)

	musics, err := musicController.usecase.GetRecentMusics(ctx, int(limit))
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": musics})
}

func (musicController *MusicController) SearchMusicsController(ctx *gin.Context) {

	title := ctx.DefaultQuery("title", "")
	artist := ctx.DefaultQuery("artist", "")
	date := ctx.DefaultQuery("date", "")
	playCount := ctx.DefaultQuery("view_count", "-1")
	genres := ctx.DefaultQuery("genres", "")

	playCountInt, _ := strconv.Atoi(playCount)
	dateTime, _ := time.Parse("2006-01-02", date)

	genresSlice := []string{}
	if genres != "" {
		genresSlice = strings.Split(genres, ",")
	}

	filter := dtos.FilterMusicRequest{
		Title:     title,
		Artist:    artist,
		Date:      dateTime,
		PlayCount: playCountInt,
		Genres:    genresSlice,
	}

	musics, err := musicController.usecase.SearchMusics(ctx, filter)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": musics})
}

func (musicController *MusicController) GetGenreListController(ctx *gin.Context) {
	genres, err := musicController.usecase.GetGenreList(ctx)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": genres})
}

func (musicController *MusicController) DeleteMusicController(ctx *gin.Context) {
	validate := validator.New()

	musicID, e := primitive.ObjectIDFromHex(ctx.Param("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}
	artistID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid artist id"})
		return
	}

	deleteMusicReq := dtos.DeleteMusicRequest{
		MusicID:  musicID,
		ArtistID: artistID,
	}

	if err := validate.Struct(deleteMusicReq); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "One or more fields are missing"})
		return
	}

	if err := musicController.usecase.DeleteMusic(ctx, deleteMusicReq); err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "Music deleted successfully"})
}

func (mc *MusicController) GetMusic(c *gin.Context) {
	musicPublicID := c.Param("publicID")
	musicURL := mc.cloudinary.GetAudioURL(musicPublicID)

	c.IndentedJSON(http.StatusOK, gin.H{"data": musicURL})
}

func (mc *MusicController) GetCoverImage(c *gin.Context) {
	coverPublicID := c.Param("publicID")
	coverURL := mc.cloudinary.GetCoverURL(coverPublicID)

	c.IndentedJSON(http.StatusOK, gin.H{"data": coverURL})
}
