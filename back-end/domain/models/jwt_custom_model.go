package models

import (
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type JWTCustom struct {
	ID primitive.ObjectID `json:"id"`
	Email string `json:"email"`
	jwt.StandardClaims
}