# Image update

The project now includes local JPG visuals for the public real-estate experience and seeded CMS records.

Updated local assets include:
- hero.jpg
- exterior.jpg
- interior.jpg
- lobby.jpg
- pool.jpg
- gym.jpg
- garden.jpg
- clubhouse.jpg
- location.jpg
- gallery.jpg
- kids-play.jpg
- hall.jpg
- security.jpg
- power-backup.jpg

`prisma/seed.ts` and CMS form placeholders were updated to use the new local JPG assets. Floor-plan SVGs remain vector assets because they are diagrams rather than photographs.

After replacing the project, run:

```powershell
npm install
npx prisma generate
npm run prisma:seed
npm run typecheck
npm run build
npm run dev
```

The seed command updates the existing project, amenity, feature and gallery records to the local JPG paths.
