#! /bin/bash
#
cd $(dirname "$0")

base=1024x1024.png

if [ -z $base ]
  then
    echo No argument given
else
  ##
  ## iOS files
  convert "$base" -resize 29x29!     "Icon-29.png"
  convert "$base" -resize 30x30!     "Icon-30.png"
  convert "$base" -resize 40x40!     "Icon-40.png"
  convert "$base" -resize 41x41!     "Icon-41.png"
  convert "$base" -resize 42x42!     "Icon-42.png"
  convert "$base" -resize 50x50!     "Icon-50.png"
  convert "$base" -resize 57x57!     "Icon-57.png"
  convert "$base" -resize 58x58!     "Icon-58.png"
  convert "$base" -resize 59x59!     "Icon-59.png"
  convert "$base" -resize 60x60!     "Icon-60.png"
  convert "$base" -resize 72x72!     "Icon-72.png"
  convert "$base" -resize 76x76!     "Icon-76.png"
  convert "$base" -resize 80x80!     "Icon-80.png"
  convert "$base" -resize 81x81!     "Icon-81.png"
  convert "$base" -resize 87x87!     "Icon-87.png"
  convert "$base" -resize 100x100!   "Icon-100.png"
  convert "$base" -resize 114x114!   "Icon-114.png"
  convert "$base" -resize 120x120!   "Icon-120.png"
  convert "$base" -resize 121x121!   "Icon-121.png"
  convert "$base" -resize 144x144!   "Icon-144.png"
  convert "$base" -resize 152x152!   "Icon-152.png"
  convert "$base" -resize 167x167!   "Icon-167.png"
  convert "$base" -resize 180x180!   "Icon-180.png"
  convert "$base" -resize 512x512!   "Icon-512.png"     


  convert "$base" -resize 512x512!   "iTunesArtwork"
  convert "$base" -resize 1024x1024! "iTunesArtwork@2x"



fi
