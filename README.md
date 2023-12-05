<h1 align="center">nostril Website</h1>

nostril website build using express + postgres + preact + esbuild.

# Developing

`npm run dev`

# CURL

    curl -X POST http://localhost:3000/api/presign -H "Content-Type: application/json" -d '{ "filename" : "test.jpg", "filetype": "image/jpg" }'