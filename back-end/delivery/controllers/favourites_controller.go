package controllers

import (
	"music_player_backend/domain/interfaces"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FavouritesController struct {
	usecase interfaces.FavouriteUsecase
}

func NewFavouritesController(usecase interfaces.FavouriteUsecase) *FavouritesController {
	return &FavouritesController{
		usecase: usecase,
	}
}

func (musicController *FavouritesController) AddFavouriteMusicController(ctx *gin.Context) {
	userID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
		return
	}

	musicID, e := primitive.ObjectIDFromHex(ctx.Param("id"))

	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}

	if err := musicController.usecase.AddFavouriteMusic(ctx, userID, musicID); err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "Music added to favourites"})
}

func (musicController *FavouritesController) RemoveFavouriteMusicController(ctx *gin.Context) {
	userID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
		return
	}

	musicID, e := primitive.ObjectIDFromHex(ctx.Param("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}

	if err := musicController.usecase.RemoveFavouriteMusic(ctx, userID, musicID); err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "Music removed from favourites"})
}

func (musicController *FavouritesController) GetFavouriteMusicController(ctx *gin.Context) {
	userID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid user id"})
		return
	}

	musics, err := musicController.usecase.GetUserFavouriteMusics(ctx, userID)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": musics})
}
