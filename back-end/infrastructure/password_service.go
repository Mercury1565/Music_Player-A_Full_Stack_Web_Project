package infrastructure

import (
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

type passwordService struct{}

func NewPasswordService() interfaces.PasswordService {
	return &passwordService{}
}

func (p *passwordService) EncryptPassword(password string) (string, error) {
	cur_pass := []byte(password)
	encryptedPassword, err := bcrypt.GenerateFromPassword(cur_pass, bcrypt.DefaultCost)

	return string(encryptedPassword), err

}

func (p *passwordService) ValidatePassword(password string, hashedPassword string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) == nil
}

func (p *passwordService) ValidatePasswordStrength(password string) *models.ErrorResponse {
	if len(password) <= 8 {
		return models.BadRequest("Password must be at least 8 characters long.")
	}

	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasDigit := regexp.MustCompile(`\d`).MatchString(password)
	hasSymbol := regexp.MustCompile(`[!@#\$%\^&\*_\+\-=\[\]\{\};:'",<>\.\?\\\/|~]`).MatchString(password)

	if !hasLower || !hasUpper || !hasDigit || !hasSymbol {
		return models.BadRequest("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.")
	}

	return nil
}
