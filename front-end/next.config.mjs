/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    redirects() {
        return [{
            source: "/dashboard/:path",
            missing: [{
                type: "cookie",
                key: "accessToken"
            }],
            destination: "/login",
            permanent: false,
        }, {
            source: "/(spotify\-callback|login)",
            has: [{
                type: "cookie",
                key: "accessToken"
            }],
            destination: "/dashboard/search/",
            permanent: false,
        }, {
            source: "/",
            destination: "/login",
            permanent: false,
        }, {
            source: "/dashboard",
            destination: "/dashboard/search",
            permanent: false,
        }]
    },
    images: {
        formats: ["image/webp"],
        remotePatterns: [{
            protocol: "https",
            hostname: "i.scdn.co"
        }]
    }
};

export default nextConfig;
