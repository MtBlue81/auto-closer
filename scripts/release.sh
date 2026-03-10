#!/bin/bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 2.3.0"
  exit 1
fi

VERSION="$1"
TAG="v${VERSION}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ZIP_NAME="auto-closer-${TAG}.zip"

# 未コミットの変更がないか確認
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: 未コミットの変更があります。先にコミットしてください。"
  exit 1
fi

echo "==> Updating version to ${VERSION}..."
cd "$ROOT_DIR"
npm version "$VERSION" --no-git-tag-version
sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" public/manifest.json

echo "==> Building..."
npm run build

echo "==> Creating zip..."
(cd build && zip -r "../${ZIP_NAME}" .)

echo "==> Committing and pushing..."
git add package.json package-lock.json public/manifest.json
git commit -m "Bump ${TAG}"
git push

echo "==> Creating tag and release..."
git tag "$TAG"
git push origin "$TAG"
gh release create "$TAG" \
  --title "$TAG" \
  --generate-notes \
  "${ROOT_DIR}/${ZIP_NAME}"

echo "==> Done! Released ${TAG}"
echo "https://github.com/MtBlue81/auto-closer/releases/tag/${TAG}"
