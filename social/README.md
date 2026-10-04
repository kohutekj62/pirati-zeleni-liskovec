# social/ — Facebook & Instagram posts picked for the website

Two files per post, with the same name, starting with the date of the post:

```text
2026-09-23-prochazka.txt   ← first line: link to the post; then an empty line; then its text
2026-09-23-prochazka.jpg   ← its photo (optional; .jpg, .png or .webp)
```

Then run `npm run social`, check the site and publish.
To take a post off the web, delete its two files and run `npm run social` again.

Full instructions: [README.md, section 12](../README.md#12-social-media--facebook--instagram-posts-on-the-website).
