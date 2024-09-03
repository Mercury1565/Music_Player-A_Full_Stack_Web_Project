package controllers

import (
	"music_player_backend/config"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

type LoginController struct {
	LoginUsecase interfaces.LoginUsecase
	Env          *config.Env
}

func NewLoginController(loginUsecase interfaces.LoginUsecase, env *config.Env) *LoginController {
	return &LoginController{
		LoginUsecase: loginUsecase,
		Env:          env,
	}
}

func (loginController *LoginController) Login(ctx *gin.Context) {
	var loginRequest dtos.LoginRequest
	validate := validator.New()

	err := ctx.ShouldBind(&loginRequest)
	if err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := validate.Struct(loginRequest); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "One or more fields are missing"})
		return
	}

	loginResponse, e := loginController.LoginUsecase.LoginUser(ctx, loginRequest)
	if e != nil {
		ctx.IndentedJSON(e.Code, gin.H{"error": e.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, loginResponse)
}
