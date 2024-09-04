package controllers

import (
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

type SignupController struct {
	SignupUsecase interfaces.SignupUsecase
}

func NewSignupController(signupUsecase interfaces.SignupUsecase) *SignupController {
	return &SignupController{
		SignupUsecase: signupUsecase,
	}
}

func (signupController *SignupController) Signup(ctx *gin.Context) {
	var userCreateRequest dtos.CreateAccountRequest
	validate := validator.New()

	err := ctx.ShouldBind(&userCreateRequest)
	if err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "invalid request payload"})
		return
	}

	if err := validate.Struct(userCreateRequest); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newUser := &models.User{
		Name:     userCreateRequest.Name,
		Email:    userCreateRequest.Email,
		Password: userCreateRequest.Password,
	}

	e := signupController.SignupUsecase.CreateUser(ctx, newUser)
	if e != nil {
		ctx.IndentedJSON(e.Code, gin.H{"error": e.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "signup successful, login to continue"})
}
