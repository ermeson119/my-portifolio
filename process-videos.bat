@echo off
echo Processando video1.mp4...

:: Processando video1
ffmpeg -i public/assets/video1.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video1-1080p.mp4
ffmpeg -i public/assets/video1.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video1-720p.mp4
ffmpeg -i public/assets/video1.mp4 -vf "scale=854:480" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video1-480p.mp4

echo Processando video3.mp4...

:: Processando video3
ffmpeg -i public/assets/video3.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video3-1080p.mp4
ffmpeg -i public/assets/video3.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video3-720p.mp4
ffmpeg -i public/assets/video3.mp4 -vf "scale=854:480" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k public/assets/video3-480p.mp4

echo Processamento concluído!
pause 