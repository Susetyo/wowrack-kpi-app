/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['careers.wowrack.co.id', 'cdn.techinasia.com'],
  },
  async headers(){
    return [
      {
        source: '/api/:path*',
        headers:[
          {
            key:'Content-Type',
            value: 'application/json'
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3000/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
