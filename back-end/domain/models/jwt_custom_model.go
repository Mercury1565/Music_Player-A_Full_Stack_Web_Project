package models

import (
	"github.com/dgrijalva/jwt-go"
)

type JWTCustom struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	jwt.StandardClaims
}
