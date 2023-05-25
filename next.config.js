// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['react-markdown']);

const nextConfig = {
    transpilePackages: ["@cloudscape-design/components"],
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = withTM(nextConfig);
