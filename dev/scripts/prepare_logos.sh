#!/usr/bin/env bash
set -euo pipefail

# Скрипт копирует и приводит к единому размеру все изображения из
# /root/Downloads/logo_footer в ./public/logos внутри проекта dev.
#
# Требования: ImageMagick (convert). Запустите из репозитория или прямо:
# bash dev/scripts/prepare_logos.sh

SRC_DIR="/root/Downloads/logo_footer"
DST_DIR="$(pwd)/public/logos"

mkdir -p "$DST_DIR"

echo "Копирую и масштабирую логотипы из $SRC_DIR в $DST_DIR"

for src in "$SRC_DIR"/*.{png,jpg,jpeg,svg,gif}; do
  [ -e "$src" ] || continue
  filename="$(basename "$src")"
  dst="$DST_DIR/$filename"
  # Для растровых изображений – привести к 160x64, сохраняя пропорции и прозрачный фон
  if [[ "$src" =~ \.(png|jpg|jpeg|gif)$ ]]; then
    convert "$src" -resize 160x64 -background none -gravity center -extent 160x64 "$dst"
  else
    # Для SVG просто копируем (можно масштабировать отдельно)
    cp "$src" "$dst"
  fi
  echo "-> $dst"
done

echo "Готово. Проверьте файлы в $DST_DIR и при необходимости обновите `src/data/logos.ts`."


