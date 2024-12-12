/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
}
module.exports = nextConfig
Create another file at the root named next-env.d.ts and leave it empty.
Create a file named postcss.config.js and paste:
js
Copy
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
}
