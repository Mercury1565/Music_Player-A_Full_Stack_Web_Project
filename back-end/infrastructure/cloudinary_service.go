package infrastructure

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"music_player_backend/config"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"net/http"
	"strings"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
)

type CloudinaryService struct {
	cloudinary *cloudinary.Cloudinary
	env        *config.Env
}

func NewCloudinaryService(cloudinary *cloudinary.Cloudinary, env *config.Env) interfaces.CloudinaryInterface {
	return &CloudinaryService{
		cloudinary: cloudinary,
		env:        env,
	}
}

func (uc *CloudinaryService) UploadCover(file multipart.FileHeader, ctx context.Context) (string, *models.ErrorResponse) {
	src, e := file.Open()
	if e != nil {
		return "", models.BadRequest("invalid file")
	}
	defer src.Close()

	// Validate the file type
	buffer := make([]byte, 512) // Read the first 512 bytes to determine the file type
	if _, e := src.Read(buffer); e != nil {
		return "", models.BadRequest("invalid file")
	}

	// Reset the read pointer after reading
	src.Seek(0, 0)

	// Get the content type
	contentType := http.DetectContentType(buffer)

	// Check if the content type is an image
	if !strings.HasPrefix(contentType, "image/") {
		return "", models.BadRequest("only image files are allowed")
	}

	uploadResult, e := uc.cloudinary.Upload.Upload(ctx, src, uploader.UploadParams{ResourceType: "image"})
	if e != nil {
		return "", models.InternalServerError("image upload failed")
	}

	return uploadResult.PublicID, nil
}

func (uc *CloudinaryService) UploadAudio(file *multipart.FileHeader, ctx context.Context) (string, *models.ErrorResponse) {
	// Step 1: Open the file
	src, e := file.Open()
	if e != nil {
		fmt.Println("Error opening file:", e)
		return "", models.BadRequest("invalid file")
	}
	defer src.Close()

	// Step 2: Create a buffer to store the file data
	var buf bytes.Buffer

	// Copy file contents to the buffer
	if _, err := io.Copy(&buf, src); err != nil {
		fmt.Println("Error copying file to buffer:", err)
		return "", models.InternalServerError("file read failed")
	}

	// Debug: Check buffer size
	fmt.Println("File copied to buffer. Buffer size:", buf.Len())

	// Step 3: Reset the buffer and create a reader from it
	fileReader := bytes.NewReader(buf.Bytes())

	// Read the first 512 bytes to check content type
	buffer := make([]byte, 512)
	if _, err := fileReader.Read(buffer); err != nil {
		fmt.Println("Error reading file for type detection:", err)
		return "", models.BadRequest("invalid file")
	}

	// Detect content type
	contentType := http.DetectContentType(buffer)
	fmt.Println("Detected content type:", contentType)

	// Check if the content is audio
	if !strings.HasPrefix(contentType, "audio/") {
		fmt.Println("Invalid content type:", contentType)
		return "", models.BadRequest("only audio files are allowed")
	}

	// Step 4: Reset the reader position before upload
	fileReader.Seek(0, io.SeekStart)

	// Step 5: Try uploading to Cloudinary
	fmt.Println("Starting upload to Cloudinary...")
	uploadResult, err := uc.cloudinary.Upload.Upload(ctx, fileReader, uploader.UploadParams{
		ResourceType: "video", // Audio is part of the "video" resource type
	})
	if err != nil {
		fmt.Println("Error uploading to Cloudinary:", err)
		return "", models.InternalServerError("audio upload failed")
	}

	// Success: Output result
	fmt.Println("Upload successful. Public ID:", uploadResult.PublicID)
	return uploadResult.PublicID, nil
}


func (uc *CloudinaryService) DeleteFile(publicID string, ctx context.Context) *models.ErrorResponse {
	_, e := uc.cloudinary.Upload.Destroy(ctx, uploader.DestroyParams{PublicID: publicID})
	if e != nil {
		return models.InternalServerError("image deletion failed")
	}
	return nil
}

func (uc *CloudinaryService) GetCoverURL(publicID string) string {
	cloudName := uc.env.CLOUDINARY_CLOUD_NAME
	imageURL := fmt.Sprintf("https://res.cloudinary.com/%s/image/upload/%s", cloudName, publicID)
	return imageURL
}

func (uc *CloudinaryService) GetAudioURL(publicID string) string {
	cloudName := uc.env.CLOUDINARY_CLOUD_NAME
	imageURL := fmt.Sprintf("https://res.cloudinary.com/%s/video/upload/%s", cloudName, publicID)
	return imageURL
}
